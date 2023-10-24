import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageComponentDto, PageConfigDto, PageDto, UpdatePageDto } from './dto/page.dto';
import { PageService } from './page.service';
import { ComponentDto, PageComponentIndexDto, ComponentTypeDto } from './dto/component.dto';
import { PassAuth } from '../../src/auth/guards/pass-auth.guard';

@PassAuth()
@ApiBearerAuth()
@ApiTags('Page')
@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) { }

  // Page

  @Get()
  async getPages(@Res() res) {
    return await this.pageService.getPages(res);
  }

  @Get('get/byslug/:slug')
  async getPageBySlug(@Param('slug') slug: string, @Res() res) {
    return await this.pageService.getPageBySlug(slug, res);

  }

  @Get('get/:page_id')
  async getPageById(@Param('page_id') page_id: number, @Res() res) {
    return await this.pageService.getPage(page_id, res);
  }

  @Post('create')
  async createPage(@Body() data: PageDto, @Res() res) {
    return await this.pageService.createPage(data, res);
  }

  @Post('update/:page_id')
  async setPageById(@Param('page_id') page_id: number, @Body() data: UpdatePageDto, @Res() res) {
    return await this.pageService.setPage(page_id, data, res);
  }

  @Post('delete/:page_id')
  async deletePageById(@Param('page_id') page_id: number, @Res() res) {
    return await this.pageService.deletePage(page_id, res);
  }

  // -------------------------------------------------------------------------------------------


  // Page Config

  @Get('configs')
  async getPageConfigs(@Res() res) {
    return await this.pageService.getPageConfigs(res);
  }

  @Get('config/:config_id')
  async getPageConfigById(@Param('config_id') config_id: number, @Res() res) {
    return await this.pageService.getPageConfig(config_id, res);
  }

  @Post('create/config')
  async createPageConfig(@Body() data: PageConfigDto, @Res() res) {
    return await this.pageService.createPageConfig(data, res);
  }

  @Post('update/config/:config_id')
  async setPageConfigById(@Param('config_id') config_id: number, @Body() data: PageConfigDto, @Res() res) {
    return await this.pageService.setPageConfig(config_id, data, res);
  }

  @Post('delete/config/:config_id')
  async deletePageConfigById(@Param('config_id') config_id: number, @Res() res) {
    return await this.pageService.deletePageConfig(config_id, res);
  }

  // -------------------------------------------------------------------------------------------


  // Page Component

  @Get('pagecomponents')
  async getPageComponents(@Res() res) {
    return await this.pageService.getPageComponents(res);
  }

  @Get('pagecomponent/:pagecomponent_id')
  async getPageComponentById(@Param('pagecomponent_id') pagecomponent_id: number, @Res() res) {
    return await this.pageService.getPageComponent(pagecomponent_id, res);
  }

  @Post('create/pagecomponent')
  async createPageComponent(@Body() data: PageComponentDto) {
    return await this.pageService.createPageComponent(data);
  }

  @Post('update/pagecomponent/:pagecomponent_id')
  async setPageComponentById(@Param('pagecomponent_id') pagecomponent_id: number, @Body() data: PageComponentDto, @Res() res) {
    return await this.pageService.setPageComponent(pagecomponent_id, data, res);
  }

  @Post('delete/pagecomponent/:pagecomponent_id')
  async deletePageComponentById(@Param('pagecomponent_id') pagecomponent_id: number, @Res() res) {
    return await this.pageService.deletePageComponent(pagecomponent_id, res);
  }

  @Get('pagecomponents/index/:page_id')
  async getPageComponentsIndex(@Param('page_id') page_id: number, @Res() res) {
    return await this.pageService.getPageComponentsIndex(page_id, res);
  }

  @Post('pagecomponents/index/:page_id')
  async setPageComponentsIndex(@Param('page_id') page_id: number, @Body() data: PageComponentIndexDto, @Res() res) {
    return await this.pageService.setPageComponentIndex(page_id, data.component_id, data.index, res);
  }


  // -------------------------------------------------------------------------------------------


  // Component

  @Get('components')
  async getComponents(@Res() res) {
    return await this.pageService.getComponents(res);
  }

  @Get('component/:component_id')
  async getComponentById(@Param('component_id') component_id: number, @Res() res) {
    return await this.pageService.getComponent(component_id, res);
  }

  @Post('create/component')
  async createComponent(@Body() data: ComponentDto, @Res() res) {
    return await this.pageService.createComponent(data, res);
  }

  @Post('update/component/:component_id')
  async setComponentById(@Param('component_id') component_id: number, @Body() data: ComponentDto, @Res() res) {
    return await this.pageService.setComponent(component_id, data, res);
  }

  @Post('delete/component/:component_id')
  async deleteComponentById(@Param('component_id') component_id: number, @Res() res) {
    return await this.pageService.deleteComponent(component_id, res);
  }

  // -------------------------------------------------------------------------------------------


  // Component Type

  @Get('componenttypes')
  async getComponentTypes(@Res() res) {
    return await this.pageService.getComponentTypes(res);
  }

  @Get('componenttype/:componenttype_id')
  async getComponentTypeById(@Param('componenttype_id') componenttype_id: number, @Res() res) {
    return await this.pageService.getComponentType(componenttype_id, res);
  }

  @Post('create/componenttype')
  async createComponentType(@Body() data: ComponentTypeDto, @Res() res) {
    return await this.pageService.createComponentType(data, res);
  }

  @Post('update/componenttype/:componenttype_id')
  async setComponentTypeById(@Param('componenttype_id') componenttype_id: number, @Body() data: ComponentTypeDto, @Res() res) {
    return await this.pageService.setComponentType(componenttype_id, data, res);
  }

  @Post('delete/componenttype/:componenttype_id')
  async deleteComponentTypeById(@Param('componenttype_id') componenttype_id: number, @Res() res) {
    return await this.pageService.deleteComponentType(componenttype_id, res);
  }

  // -------------------------------------------------------------------------------------------

}
