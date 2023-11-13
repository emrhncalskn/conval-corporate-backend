import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/permissions/guards/permission.guard';
import { Permission } from 'src/permissions/decorators/permission.decorator';
import { PassAuth } from 'src/auth/guards/pass-auth.guard';

@ApiBearerAuth()
@ApiTags('CV')
@UseGuards(PermissionGuard)
@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) { }

  @Permission(82)
  @Get('testimonial/:id')
  async getTestimonial(@Param('id') id: number) {
    return await this.cvService.getTestimonial(id);
  }

  @PassAuth()
  @Permission() // 83
  @Get('testimonials')
  async getTestimonials() {
    return await this.cvService.getTestimonials();
  }

  @Permission(84)
  @Get('position/:id')
  async getPosition(@Param('id') id: number) {
    return await this.cvService.getPosition(id);
  }

  @PassAuth()
  @Permission() //85
  @Get('positions')
  async getPositions() {
    return await this.cvService.getPositions();
  }

  @PassAuth()
  @Permission() //86
  @Get('references')
  async getReferences() {
    return await this.cvService.getReferences();
  }

  @PassAuth()
  @Permission() //87
  @Get('projects')
  async getProjects() {
    return await this.cvService.getProjects();
  }

  @PassAuth()
  @Permission() //88
  @Get('locations')
  async getLocations() {
    return await this.cvService.getLocations();
  }

  @PassAuth()
  @Permission() //89
  @Post('application')
  async createApplication(@Body() data: CreateApplicationDto, @Res() res) {
    return await this.cvService.createApplication(data, res);
  }

}
