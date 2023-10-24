import { MailerModule, MailerService } from '@nestjs-modules/mailer'; 
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { MailController } from './mail.controller';

config();

@Module({
    imports: [
      
      MailerModule.forRootAsync({
          useFactory: async (config: ConfigService) => ({
            transport: {
                host: config.get('MAIL_HOST'),
                secure: true,
                port: config.get('MAIL_PORT'),
                auth: {
                  user: config.get('MAIL_USER'),
                  pass: config.get('MAIL_PASSWORD'),
                },
            },
            defaults: {
                from: `"Conval İletişim Ekibi " <${config.get('MAIL_FROM')}>`,
            },
            template: {
                dir: join(__dirname, './templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                  strict: true,
                },
            },
          }),
        inject: [ConfigService],
      }),
    ],
    controllers: [MailController],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
