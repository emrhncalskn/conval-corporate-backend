import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { GeneralsService } from '../generals/generals.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GeneralDto } from './dto/general.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { UploadPhotoDto } from 'src/users/dto/photo.dto';
import { Functions } from 'services/functions/functions';
import { PermissionGuard } from 'src/permissions/guards/permission.guard';
import { Permission } from 'src/permissions/decorators/permission.decorator';

const func = new Functions;

@ApiTags('Generals')
@UseGuards(PermissionGuard)
@Controller('generals')
export class GeneralsController {
  constructor(
    private generalsService: GeneralsService,
  ) { }

  @Permission()
  @Get()
  async findAll(@Res() res) {
    return await this.generalsService.findAll(res);
  }

  @Permission()
  @Get('get/:id')
  async findOne(@Res() res, @Param('id') id: number) {
    return await this.generalsService.findOne(res, id);
  }

  @Permission()
  @Get('getbyslug/:slug')
  async findBySlug(@Res() res, @Param('slug') slug: string) {
    return await this.generalsService.findBySlug(res, slug);
  }

  @Permission(20)
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('create')
  async create(@Body() data: GeneralDto, @Res() res) {
    return await this.generalsService.create(data, res);
  }

  @Permission(21)
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('update/:id')
  async update(@Param('id') id: number, @Body() data: GeneralDto, @Req() req, @Res() res) {
    return await this.generalsService.update(id, data, res);
  }

  @Permission(22)
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: number, @Req() req, @Res() res) {
    return await this.generalsService.delete(id, res);
  }

}
