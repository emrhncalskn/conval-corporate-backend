import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { AppService } from 'src/app.service';
import { Users } from 'src/users/entities/users.entity';
import { Permissions } from 'src/permissions/entities/permissions.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Language, Users, Permissions])],
  controllers: [LanguageController],
  providers: [LanguageService, AppService, JwtService],
})
export class LanguageModule { }
