import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
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

}