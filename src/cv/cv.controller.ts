import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/permissions/guards/permission.guard';
import { Permission } from 'src/permissions/decorators/permission.decorator';

@ApiBearerAuth()
@ApiTags('CV')
@UseGuards(PermissionGuard)
@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) { }

  @Permission()
  @Get('testimonial/:id')
  async getTestimonial(@Param('id') id: number) {
    return await this.cvService.getTestimonial(id);
  }

  @Permission()
  @Get('testimonials')
  async getTestimonials() {
    return await this.cvService.getTestimonials();
  }

  @Permission()
  @Get('position/:id')
  async getPosition(@Param('id') id: number) {
    return await this.cvService.getPosition(id);
  }

  @Permission()
  @Get('positions')
  async getPositions() {
    return await this.cvService.getPositions();
  }

  @Permission()
  @Get('references')
  async getReferences() {
    return await this.cvService.getReferences();
  }

  @Permission()
  @Get('projects')
  async getProjects() {
    return await this.cvService.getProjects();
  }

  @Permission()
  @Get('locations')
  async getLocations() {
    return await this.cvService.getLocations();
  }

  @Permission()
  @Post('application')
  async createApplication(@Body() data: CreateApplicationDto, @Res() res) {
    return await this.cvService.createApplication(data, res);
  }

}
