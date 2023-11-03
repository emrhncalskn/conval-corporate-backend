import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { File } from './entities/file.entity';
import { FileType } from './entities/file_type.entity';
import { Location } from './entities/location.entity';
import { Position } from './entities/position.entity';
import { Project } from './entities/project.entity';
import { Reference } from './entities/reference.entity';
import { Testimonial } from './entities/testimonial.entity';
import { Users } from 'src/users/entities/users.entity';
import { Permissions } from 'src/permissions/entities/permissions.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Permissions, Users, Application, File, FileType, Location, Position, Project, Reference, Testimonial])],
  controllers: [CvController],
  providers: [CvService, JwtService],
})
export class CvModule { }
