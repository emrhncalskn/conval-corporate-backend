import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/blog.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadPhotoDto } from 'src/users/dto/photo.dto';
import { Functions } from 'services/functions/functions';
import { Permission } from 'src/permissions/decorators/permission.decorator';
import { PermissionGuard } from 'src/permissions/guards/permission.guard';

const func = new Functions;

@ApiTags('Blogs')
@UseGuards(PermissionGuard)
@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
  ) { }

  @Permission()
  @Get()
  async findAll() {
    return await this.blogsService.findAll();
  }

  @Permission()
  @Get('get/:id')
  async findOne(@Param('id') id: number, @Res() res) {
    return await this.blogsService.findOne(id, res);
  }

  @Permission(29)
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('create')
  async create(@Body() data: CreateBlogDto, @Res() res, @Req() req) {
    return await this.blogsService.create(data, res, req.user.id);
  }

  @Permission(30)
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('update/:id')
  async update(@Param('id') id: number, @Body() data: CreateBlogDto, @Res() res) {
    return await this.blogsService.update(id, data, res);
  }

  @Permission(31)
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('delete/:id')
  async delete(@Param('id') id: number, @Res() res) {
    return await this.blogsService.delete(id, res);
  }

  @Permission(32)
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './assets/images/uploads/blogs/',
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
    return this.blogsService.uploadPhoto(photo, id)
  }

}