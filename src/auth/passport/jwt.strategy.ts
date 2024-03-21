//this class use to decode token (to validate token)

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/users.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService,) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            //secretOrKey: 'JWT_ACCESS_TOKEN_SECRET'
            secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        });
    }

    async validate(payload: IUser) { //validate: this is keyword of 'PassportStrategy' 
        const { _id, name, email, role } = payload;
        return {
            _id,
            name,
            email,
            role
        }; //req.user = { _id, name, email, role} (user in 'local.strategy.ts')
    }
}