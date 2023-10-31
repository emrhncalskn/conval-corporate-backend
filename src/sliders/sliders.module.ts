import { Module } from '@nestjs/common';
import { SlidersController } from './sliders.controller';
import { SlidersService } from './sliders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sliders } from './entities/sliders.entity';
import { Users } from '../../src/users/entities/users.entity';
import { Permissions } from '../../src/permissions/entities/permissions.entity';
import { JwtService } from '@nestjs/jwt';
import { Images } from '../../src/media/entities/images.entity';
import { Language } from 'src/language/entities/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Sliders, Permissions, Images, Language])],
  controllers: [SlidersController],
  providers: [SlidersService, JwtService]
})
export class SlidersModule { }
