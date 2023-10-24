import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../src/users/entities/users.entity';
import { Functions } from './entities/functions.entity';
import { Roles } from './entities/roles.entity';
import { Permissions } from './entities/permissions.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Permissions, Roles, Functions])],
  controllers: [PermissionsController],
  providers: [PermissionsService, JwtService]
})
export class PermissionsModule { }
