import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PassAuth } from '../../src/auth/guards/pass-auth.guard';
import { Permission } from '../../src/permissions/decorators/permission.decorator';
import { PermissionGuard } from '../../src/permissions/guards/permission.guard';
import { CreateMenuDto, MenuTypeDto, UpdateMenuDto } from './dto/menu.dto';
import { MenuService } from './menu.service';

@ApiBearerAuth()
@Controller('menu')
@UseGuards(PermissionGuard)
@ApiTags('Menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Permission(38)
  @Get('get/byid/:id')
  async getMenu(@Param('id') id: number, @Req() req) {
    return await this.menuService.getMenu(id);
  }

  @PassAuth()
  @Permission()
  @Get('get/byslug/:slug')
  async getMenuBySlug(@Param('slug') slug: string) {
    return await this.menuService.getMenuBySlug(slug);
  }

  @PassAuth()
  @Permission()
  @Get('get/all')
  async getMenus() {
    return await this.menuService.getMenus();
  }

  @PassAuth()
  @Permission()
  @Get('get/allwith/:slug/:lang')
  async getMenusWithType(@Param('slug') slug: string, @Param('lang') lang: string) {
    return await this.menuService.getMenusWithType(slug, lang);
  }

  @Permission(39)
  @Post('create')
  async createMenu(@Body() data: CreateMenuDto, @Res() res) {
    return await this.menuService.createMenu(data, res);
  }

  @Permission(40)
  @Post('set/:id')
  async setMenu(@Body() data: UpdateMenuDto, @Param('id') id: number, @Res() res) {
    return await this.menuService.setMenu(data, id, res);
  }

  @Permission(41)
  @Post('delete/:id')
  async deleteMenu(@Param('id') id: number, @Res() res) {
    return await this.menuService.deleteMenu(id, res);
  }

  @Permission()
  @Get('type/:id')
  async getMenuType(@Param('id') id: number) {
    return await this.menuService.getMenuType(id);
  }

  @Permission()
  @Get('type/byslug/:slug')
  async getMenuTypeBySlug(@Param('slug') slug: string) {
    return await this.menuService.getMenuTypeBySlug(slug);
  }

  @Permission()
  @Get('types')
  async getMenuTypes() {
    return await this.menuService.getMenuTypes();
  }

  @Permission()
  @Post('type/create')
  async createMenuType(@Body() data: MenuTypeDto, @Res() res) {
    return await this.menuService.createMenuType(data, res);
  }

  @Permission()
  @Post('type/set/:id')
  async setMenuType(@Body() data: MenuTypeDto, @Param('id') id: number, @Res() res) {
    return await this.menuService.setMenuType(data, id, res);
  }

  @Permission()
  @Post('type/delete/:id')
  async deleteMenuType(@Param('id') id: number, @Res() res) {
    return await this.menuService.deleteMenuType(id, res);
  }

}
