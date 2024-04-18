import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync('./secrets/private-key.pem'),
    cert: fs.readFileSync('./secrets/public-certificate.pem'),
  };


  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });  

  const appHttp = await NestFactory.create(AppModule);  

  const config = new DocumentBuilder()
    .setTitle('Konfigurator-nestjs-Backend')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('api', appHttp, SwaggerModule.createDocument(appHttp, config));

  app.enableCors()
  appHttp.enableCors()
  await app.listen(3000);
  await appHttp.listen(7246);
}
bootstrap();
