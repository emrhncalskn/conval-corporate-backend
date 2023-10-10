import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenuType } from './entities/menu_type.entity';
import { Users } from 'src/users/entities/users.entity';
import { Permissions } from 'src/permissions/entities/permissions.entity';
import { JwtService } from '@nestjs/jwt';
import { Pages } from 'src/pages/entities/pages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permissions, Pages, Users, Menu, MenuType])],
  controllers: [MenuController],
  providers: [MenuService, JwtService],
})
export class MenuModule { }
