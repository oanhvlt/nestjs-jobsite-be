import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt.guard';

async function bootstrap() { //bootstrap: khởi động
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  //set global guard
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.useStaticAssets(join(__dirname, '..', 'public')); //js, css, image
  app.setBaseViewsDir(join(__dirname, '..', 'views')); //view
  //app.setBaseViewsDir(join(__dirname, '..', "./src/views"));
  app.setViewEngine('ejs');

  //before run app, call validation
  app.useGlobalPipes(new ValidationPipe());


  //await app.listen(process.env.PORT);
  await app.listen(configService.get('PORT')); //or  configService.get<string>('PORT')
}
bootstrap();
