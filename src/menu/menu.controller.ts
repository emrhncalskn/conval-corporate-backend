import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Permission } from 'src/permissions/decorators/permission.decorator';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/permissions/guards/permission.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';

@Controller('menu')
@UseGuards(PermissionGuard)
@ApiTags('Menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @ApiBearerAuth()
  @Permission(38)
  @UseGuards(JwtGuard)
  @Get('get/byid/:id')
  async getMenu(@Param('id') id: number) {
    return await this.menuService.getMenu(id);
  }

  @Permission()
  @Get('get/byslug/:slug')
  async getMenuBySlug(@Param('slug') slug: string) {
    return await this.menuService.getMenuBySlug(slug);
  }

  @Permission()
  @Get('get/all')
  async getMenus() {
    return await this.menuService.getMenus();
  }

  @Permission(39)
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post('create')
  async createMenu(@Body() data: CreateMenuDto, @Res() res) {
    console.log('agubugu')
    return await this.menuService.createMenu(data, res);
  }

  @ApiBearerAuth()
  @Permission(40)
  @UseGuards(JwtGuard)
  @Post('set/:id')
  async setMenu(@Body() data: UpdateMenuDto, @Param('id') id: number, @Res() res) {
    return await this.menuService.setMenu(data, id, res);
  }

  @ApiBearerAuth()
  @Permission(41)
  @UseGuards(JwtGuard)
  @Post('delete/:id')
  async deleteMenu(@Param('id') id: number, @Res() res) {
    return await this.menuService.deleteMenu(id, res);
  }
}
