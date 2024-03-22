import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import ms from 'ms';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user) {
            const isValid = this.usersService.isValidPassword(pass, user.password);
            if (isValid) {
                return user;
            }
        }
        return null;
    }

    async login(user: IUser, res: Response) {
        const { _id, name, email, role } = user;
        const payload = {
            sub: "token login",
            iss: "from server",
            _id,
            name,
            email,
            role
        };
        const refresh_token = this.createRefreshToken(payload);

        //update user with refresh token
        await this.usersService.updateUserToken(refresh_token, _id);
        //clear cookie
        //res.clearCookie('key1');

        //set refresh token cookie
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE'))
        });

        return {
            access_token: this.jwtService.sign(payload),
            //refresh_token: this.createRefreshToken(payload),
            user: {
                _id,
                name,
                email,
                role
            }
        };

    }

    async register(registerUser: RegisterUserDto): Promise<any> {
        const user = await this.usersService.register(registerUser);
        return {
            _id: user?._id, //? case user is null
            createdAt: user?.createdAt,
        };
    }

    createRefreshToken = (payload: any) => {
        const refresh_token = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) / 1000
        });
        return refresh_token;
    }

    processNewToken = async (refreshToken: string, res: Response) => {

        try {
            this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
            })

            let user = await this.usersService.findUserToken(refreshToken);
            if (user) {
                //update refesh token
                const { _id, name, email, role } = user;
                const payload = {
                    sub: "token refresh",
                    iss: "from server",
                    _id,
                    name,
                    email,
                    role
                };
                const refresh_token = this.createRefreshToken(payload);

                //update user with refresh token
                await this.usersService.updateUserToken(refresh_token, _id.toString());

                //clear cookie
                res.clearCookie('refresh_token');

                //set refresh token cookie
                res.cookie('refresh_token', refresh_token, {
                    httpOnly: true,
                    maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE'))
                });

                return {
                    access_token: this.jwtService.sign(payload),
                    user: {
                        _id,
                        name,
                        email,
                        role
                    }
                };

            } else {
                throw new BadRequestException('Refresh token không hợp lệ, vui lòng login.')
            }

        } catch (error) {
            console.log(error);
            throw new BadRequestException('Refresh token không hợp lệ, vui lòng login.')
        }
    }

    logout = async (res: Response, user: IUser) => {
        //Update refresh_token === null (empty)
        await this.usersService.updateUserToken('', user._id);
        //Remove refresh_token ở cookies (remove cookies)
        res.clearCookie('refresh_token');
        return 'ok';
    }
}
