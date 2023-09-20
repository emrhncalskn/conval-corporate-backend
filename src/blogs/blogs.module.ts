import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blogs } from './entities/blogs.entity';
import { Images } from 'src/users/entities/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blogs, Images])],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule { }
