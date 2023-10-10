import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from './entities/images.entity';
import { Users } from 'src/users/entities/users.entity';
import { Permissions } from 'src/permissions/entities/permissions.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Images, Users, Permissions])],
  controllers: [MediaController],
  providers: [MediaService, JwtService],
})
export class MediaModule { }
