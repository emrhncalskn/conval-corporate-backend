import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FileType } from './entities/file_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File, FileType])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule { }
