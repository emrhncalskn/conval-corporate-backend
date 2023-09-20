import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { SidebarsService } from './sidebars.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSidebarDto } from './dto/create-sidebar.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { UploadPhotoDto } from 'src/users/dto/photo.dto';
import { Functions } from 'services/functions/functions';

const func = new Functions;

@ApiTags('Sidebars')
@Controller('sidebars')
export class SidebarsController {
  constructor(
    private sidebarsService: SidebarsService,
  ) { }

  @Get()
  async findAll(@Res() res) {
    return await this.sidebarsService.findAll(res);
  }

  @Get('get/:id')
  async findOne(@Res() res, @Param('id') id: number) {
    return await this.sidebarsService.findOne(res, id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('create')
  async create(@Body() data: CreateSidebarDto, @Req() req, @Res() res) {
    return await this.sidebarsService.create(data, req.user.id, res);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('update/:id')
  async update(@Param('id') id: number, @Body() data: CreateSidebarDto, @Req() req, @Res() res) {
    return await this.sidebarsService.update(id, data, req.user.id, res);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: number, @Req() req, @Res() res) {
    return await this.sidebarsService.delete(id, req.user.id, res);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiResponse({ status: 201, description: 'Ürün fotoğrafı ekler' })
  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './assets/images/uploads/sidebars/',
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
    return this.sidebarsService.uploadPhoto(photo, id)
  }

}
