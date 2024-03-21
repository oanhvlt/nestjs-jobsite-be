import { Body, Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';


@Controller('auth') // route /auth
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }


    @Public() // define at customize.ts to ignore JWT
    @UseGuards(LocalAuthGuard)  //Passport Guard: https://docs.nestjs.com/recipes/passport
    @ResponseMessage('User Login')
    @Post('login')
    handleLogin(@Request() req) {
        return this.authService.login(req.user);
    }

    @Public()
    @ResponseMessage('Register a new user')
    @Post('register')
    handleRegister(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }


}
