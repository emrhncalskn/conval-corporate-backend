import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import { Images } from '../media/entities/images.entity';
import { Permissions } from 'src/permissions/entities/permissions.entity';
import { Roles } from 'src/permissions/entities/roles.entity';
import { PageExtra } from 'src/pages/entities/pages_extra.entity';

@Module({
  imports: [MulterModule.register({
    dest: './assets/images',
  }),
  TypeOrmModule.forFeature([Users, PageExtra, Images, Permissions, Roles]),
  ],
  providers: [UsersService, JwtService],
  controllers: [UsersController]
})
export class UsersModule { }
