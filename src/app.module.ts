import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { AuthModule } from './auth/auth.module';
import { SlidersModule } from './sliders/sliders.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PermissionsModule } from './permissions/permissions.module';
import { GeneralsModule } from './generals/generals.module';
import { MenuModule } from './menu/menu.module';
import { MediaModule } from './media/media.module';
import { PageModule } from './page/page.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { LanguageModule } from './language/language.module';
import { CvModule } from './cv/cv.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [TypeOrmModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],

    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'assets/images/uploads'),
    }),
    UsersModule, BlogsModule, AuthModule, SlidersModule, PermissionsModule, GeneralsModule, MenuModule, MediaModule, PageModule, MailModule, MailerModule, LanguageModule, CvModule, FileModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule { }
