import { Module } from '@nestjs/common';
import { SidebarsService } from './sidebars.service';
import { SidebarsController } from './sidebars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sidebars } from './entities/sidebars.entity';
import { Images } from 'src/users/entities/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sidebars, Images])],
  controllers: [SidebarsController],
  providers: [SidebarsService],
})
export class SidebarsModule { }
