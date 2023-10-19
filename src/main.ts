import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { request } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  //.env dosyası import işlemi
  dotenv.config();

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  // Swagger tanımlarını oluştur
  const config = new DocumentBuilder()
    .setTitle('Conval Corporate API')
    .setDescription('API for managing Conval Corporate')
    .setVersion('3.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //-------

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4006',
      'http://localhost:5006',
      'http://192.168.1.100:3000',
      'http://192.168.1.100:4006',
      'http://192.168.1.100:5006',
      'https://conval.labconnect.me',
      'https://conval-test.cosmostest.tech',
      'https://conval-test.cosmostest.tech:4006',
      'https://conval-test.cosmostest.tech:5006',
      'https://conval-admin.cosmostest.tech',
      'https://conval-group-education-p39cgg992-uguryasa.vercel.app/',
      'https://conval-education.cosmostest.tech'
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  });

  //------------
  app.setBaseViewsDir(join(__dirname, '..', '../views'));
  app.setViewEngine('hbs');

  const listener = await app.listen(3006);
  console.log(`Uygulama '${await app.getUrl()}' adresinde çalışıyore.`);
  console.log(`Swagger '${await app.getUrl()}/api' adresinde çalışıyore.`);
}
bootstrap();
