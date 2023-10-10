import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { SlidersModule } from './sliders/sliders.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PermissionsModule } from './permissions/permissions.module';
import { GeneralsModule } from './generals/generals.module';
import { MenuModule } from './menu/menu.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [TypeOrmModule,
    ConfigModule.forRoot(),
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
    UsersModule, BlogsModule, PagesModule, AuthModule, SlidersModule, PermissionsModule, GeneralsModule, MenuModule, MediaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
