import { Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './auth/local.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.guard';
import { Public } from './decorator/customize';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
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
