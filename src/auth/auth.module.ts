import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { Images } from 'src/users/entities/images.entity';
import { Roles } from 'src/permissions/entities/roles.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Users, Images, Roles]),
    JwtModule.register(
      {
        secret: 'c0nv4lc0rp0r4t3', // JWT için gizli anahtar
      }),
    PassportModule
  ],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
