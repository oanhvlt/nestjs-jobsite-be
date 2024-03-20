import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt.guard';
import { TransformInterceptor } from './core/transform.interceptor';

async function bootstrap() { //bootstrap: khởi động
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  //set global guard
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  //use Interceptor global: transform data trước khi trả về client
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  app.useStaticAssets(join(__dirname, '..', 'public')); //js, css, image
  app.setBaseViewsDir(join(__dirname, '..', 'views')); //view
  //app.setBaseViewsDir(join(__dirname, '..', "./src/views"));
  app.setViewEngine('ejs');

  //before run app, call validation
  app.useGlobalPipes(new ValidationPipe());


  //config cors
  app.enableCors({
    "origin": "http://localhost:3000",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  })
  // app.use(function (req, res, next) { //this is midleware

  //   // Website you wish to allow to connect
  //   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  //   // Request methods you wish to allow
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  //   // Request headers you wish to allow
  //   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  //   // Set to true if you need the website to include cookies in the requests sent
  //   // to the API (e.g. in case you use sessions)
  //   res.setHeader('Access-Control-Allow-Credentials', true);

  //   // Pass to next layer of middleware
  //   next();
  // });

  //config version api
  app.setGlobalPrefix('api');//// replace default prefix: 'v' => api/v
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1', '2']
  });

  //await app.listen(process.env.PORT);
  await app.listen(configService.get('PORT')); //or  configService.get<string>('PORT')
}
bootstrap();
