import { Body, Controller, Get, Post, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { RegisterUserDto, UserLoginDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('auth')
@Controller('auth') // route /auth
export class AuthController {
    constructor(
        private authService: AuthService,
        private roldService: RolesService
    ) { }

    //return token when user login, http://localhost:8000/api/v1/auth/login

    @Public() // define at customize.ts to ignore JWT
    @ApiBody({ type: UserLoginDto, })
    @UseGuards(LocalAuthGuard)  //Passport Guard: https://docs.nestjs.com/recipes/passport
    @UseGuards(ThrottlerGuard)
    @Throttle(3, 60)
    @ResponseMessage('User Login')
    @Post('login')
    handleLogin(@Req() req, @Res({ passthrough: true }) res: Response) {
        return this.authService.login(req.user, res);
    }

    //Register account public: ko cần truyền token
    @Public()
    @ResponseMessage('Register a new user')
    @Post('register')
    handleRegister(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    //api Get Account (F5 Refresh at client) : http://localhost:8000/api/v1/auth/account
    @ResponseMessage('Get user information')
    @Get('account')
    async handleGetAccount(@User() user: IUser) { //req.user
        const temp = await this.roldService.findOne(user.role._id) as any;
        user.permissions = temp.permissions;
        return { user }
    }

    @Public()
    @ResponseMessage('Get User by refresh token')
    @Get('refresh')
    handleRefreshToken(@Req() request: Request, @Res({ passthrough: true }) res: Response) {
        const refreshToken: string = request.cookies['refresh_token'];
        return this.authService.processNewToken(refreshToken, res);
    }

    @ResponseMessage('Logout User')
    @Post('logout')
    handleLogout(@Res({ passthrough: true }) res: Response, @User() user: IUser) {
        return this.authService.logout(res, user);
    }


}
