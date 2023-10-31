import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { LanguageService } from './language.service';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { CreateLanguageDto } from './dto/create-language.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Permission } from 'src/permissions/decorators/permission.decorator';
import { PermissionGuard } from 'src/permissions/guards/permission.guard';

@ApiBearerAuth()
@ApiTags('Language')
@UseGuards(PermissionGuard)
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) { }

  @Permission(43)
  @Get('get/all')
  async getLanguages(@Res() res) {
    return await this.languageService.getLanguages(res);
  }

  @Permission(44)
  @Get('get/:langcode')
  async getLanguageByCode(@Param('langcode') langcode: string, @Res() res) {
    return await this.languageService.getLanguageByCode(langcode, res);
  }

  @Permission(45)
  @Post('create')
  async createLanguage(@Body() data: CreateLanguageDto, @Res() res) {
    return await this.languageService.createLanguage(data, res);
  }

  @Permission(46)
  @Post('set/:langcode')
  async setLanguageByCode(@Param('langcode') langcode: string, @Body() data: UpdateLanguageDto, @Res() res) {
    return await this.languageService.setLanguageByCode(langcode, data, res);
  }

  @Permission(47)
  @Post('delete/:langcode')
  async deleteLanguageByCode(@Param('langcode') langcode: string, @Res() res) {
    return await this.languageService.deleteLanguageByCode(langcode, res);
  }

}
