import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Functions } from '../../services/functions/functions';
import { JwtGuard } from '../../src/auth/guards/jwt-auth.guard';
import { Permission } from '../../src/permissions/decorators/permission.decorator';
import { PermissionGuard } from '../../src/permissions/guards/permission.guard';
import { CreateSliderDto } from './dto/create-slider.dto';
import { SetSliderDto } from './dto/slider.dto';
import { SlidersService } from './sliders.service';
import { PassAuth } from '../../src/auth/guards/pass-auth.guard';

const func = new Functions;

@ApiBearerAuth()
@ApiTags('Sliders')
@Controller('sliders')
@UseGuards(PermissionGuard)
export class SlidersController {
    constructor(
        private slidersService: SlidersService
    ) { }

    @PassAuth()
    @Permission()
    @Get()
    async getSliders(@Res() res) {
        return this.slidersService.getSliders(res);
    }

    @PassAuth()
    @Permission()
    @Get('get/:id')
    async getSlider(@Res() res, @Param('id') id: number) {
        return this.slidersService.getSlider(res, id);
    }

    @Permission(16)
    @Post('create')
    async create(@Res() res, @Body() data: CreateSliderDto) {
        return this.slidersService.create(res, data);
    }

    @Permission(17)
    @Post('set/:id')
    async setSlider(@Res() res, @Param('id') id: number, @Body() data: SetSliderDto) {
        return this.slidersService.setSlider(res, id, data);
    }

    @Permission(18)
    @Post('del/:id')
    async delSlider(@Res() res, @Param('id') id: number) {
        return this.slidersService.delSlider(res, id);
    }

}
