import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PassAuth } from 'src/auth/guards/pass-auth.guard';
import { Permission } from 'src/permissions/decorators/permission.decorator';
import { PermissionGuard } from 'src/permissions/guards/permission.guard';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
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
}
