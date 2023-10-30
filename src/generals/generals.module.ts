import { Module } from '@nestjs/common';
import { GeneralsController } from './generals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Generals } from './entities/generals.entity';
import { Images } from 'src/media/entities/images.entity';
import { Users } from 'src/users/entities/users.entity';
import { Permissions } from 'src/permissions/entities/permissions.entity';
import { JwtService } from '@nestjs/jwt';
import { GeneralsService } from './generals.service';
import { Language } from 'src/language/entities/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Generals, Images, Users, Permissions,Language])],
  controllers: [GeneralsController],
  providers: [GeneralsService, JwtService],
})
export class GeneralsModule { }
