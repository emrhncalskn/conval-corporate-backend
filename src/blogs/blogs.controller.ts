import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Functions } from 'services/functions/functions';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { Permission } from 'src/permissions/decorators/permission.decorator';
import { PermissionGuard } from 'src/permissions/guards/permission.guard';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/blog.dto';

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