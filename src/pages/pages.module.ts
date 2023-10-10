import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagesEntity } from './entities/pages.entity';
import { Users } from 'src/users/entities/users.entity';
import { Permissions } from 'src/permissions/entities/permissions.entity';
import { JwtService } from '@nestjs/jwt';
import { Images } from 'src/media/entities/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PagesEntity, Users, Permissions, Images])],
  controllers: [PagesController],
  providers: [PagesService, JwtService]
})
export class PagesModule { }
