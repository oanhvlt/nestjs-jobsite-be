import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


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
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true // update khong bị mất dữ liệu
  }));

  // config cookies
  app.use(cookieParser());

  //config cors
  app.enableCors({
    //origin: "http://localhost:3000",
    origin: true, // allow FE có cùng domain với server
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204
  })

  //config version api
  app.setGlobalPrefix('api');//// replace default prefix: 'v' => api/v
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1', '2']
  });

  //config helmet
  app.use(helmet());

  //config swagger affter all configs
  const config = new DocumentBuilder()
    .setTitle('NestJS - jobsite APIs document')
    .setDescription('All Modules APIs')
    .setVersion('1.0')
    //.addTag('cats')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'token',
    )
    .addSecurityRequirements('token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    //allow save token (Authorize) after refresh
    swaggerOptions: {
      persistAuthorization: true,
      persistAuthorizationInSession: true,

    }
  });




  //await app.listen(process.env.PORT);
  await app.listen(configService.get('PORT')); //or  configService.get<string>('PORT')
}
bootstrap();
