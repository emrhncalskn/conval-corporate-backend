import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { request } from 'express';

async function bootstrap() {
  //.env dosyası import işlemi
  dotenv.config();

  const app = await NestFactory.create(AppModule);

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
      'http://192.168.1.100:3000',
      'http://192.168.1.100:4006',
      'https://conval.labconnect.me',
      'https://conval-test.cosmostest.tech',
      'https://conval-test.cosmostest.tech:4006',
      'https://conval-admin.cosmostest.tech',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  });

  //------------

  const listener = await app.listen(3006);
  console.log(`Uygulama ':${listener.address().port}' portunda çalışıyor.`);
}
bootstrap();
