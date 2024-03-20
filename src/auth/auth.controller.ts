import { Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';
import { Public } from 'src/decorator/customize';


@Controller('auth') // route /auth
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }


    @Public() // define at customize.ts
    @UseGuards(LocalAuthGuard)  //Passport Guard: https://docs.nestjs.com/recipes/passport
    @Post('/login')
    handleLogin(@Request() req) {
        return this.authService.login(req.user);
    }

    //@UseGuards(JwtAuthGuard)
    @Public()
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }


    //@UseGuards(JwtAuthGuard)
    @Get('profile1')
    getProfile1(@Request() req) {
        return req.user;
    }


}
