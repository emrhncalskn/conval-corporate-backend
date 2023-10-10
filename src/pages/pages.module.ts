import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pages } from './entities/pages.entity';
import { Users } from 'src/users/entities/users.entity';
import { Permissions } from 'src/permissions/entities/permissions.entity';
import { JwtService } from '@nestjs/jwt';
import { Images } from '../media/entities/images.entity';
import { PageExtra } from '../pages/entities/pages_extra.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Pages, PageExtra, Users, Permissions, Images])],
  controllers: [PagesController],
  providers: [PagesService, JwtService]
})
export class PagesModule { }
