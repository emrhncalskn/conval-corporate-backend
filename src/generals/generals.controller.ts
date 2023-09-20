import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { GeneralsService } from '../generals/generals.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateGeneralDto } from './dto/create-general.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { UploadPhotoDto } from 'src/users/dto/photo.dto';
import { Functions } from 'services/functions/functions';
import { PermissionGuard } from 'src/permissions/guards/permission.guard';
import { Permission } from 'src/permissions/decorators/permission.decorator';

const func = new Functions;

@ApiBearerAuth()
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

  @Permission(20)
  @UseGuards(JwtGuard)
  @Post('create')
  async create(@Body() data: CreateGeneralDto, @Res() res) {
    return await this.generalsService.create(data, res);
  }

  @Permission(21)
  @UseGuards(JwtGuard)
  @Post('update/:id')
  async update(@Param('id') id: number, @Body() data: CreateGeneralDto, @Req() req, @Res() res) {
    return await this.generalsService.update(id, data, res);
  }

  @Permission(22)
  @UseGuards(JwtGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: number, @Req() req, @Res() res) {
    return await this.generalsService.delete(id, res);
  }

  @Permission(23)
  @UseGuards(JwtGuard)
  @ApiResponse({ status: 201, description: 'Ürün fotoğrafı ekler' })
  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './assets/images/uploads/generals/',
      filename: (req, file, cb) => { //cb = callback
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}` + '.' + `${file.mimetype.split('/')[1]}`)
      }
    })
  }))
  async uploadImg(@Body() photo: UploadPhotoDto, @Param('id') id: number, @UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1000000 }),
      new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })]
  })) file: Express.Multer.File) {
    photo.itype = file.mimetype.split('/')[1]
    photo.iname = file.filename
    photo.iurl = file.path
    photo.ialt = await func.fillEmpty(file.originalname)
    if (file.size > 1000000) { return 'Boyutu çok büyük! Max: (10MB)' }
    return this.generalsService.uploadPhoto(photo, id)
  }

}
