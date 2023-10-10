import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from './entities/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Images])],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule { }
