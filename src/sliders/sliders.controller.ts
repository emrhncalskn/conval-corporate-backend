import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Functions } from 'services/functions/functions';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { UploadPhotoDto } from 'src/users/dto/photo.dto';
import { CreateSliderDto } from './dto/create-slider.dto';
import { SetSliderDto } from './dto/slider.dto';
import { SlidersService } from './sliders.service';
import { Permission } from 'src/permissions/decorators/permission.decorator';
import { PermissionGuard } from 'src/permissions/guards/permission.guard';

const func = new Functions;

@ApiTags('Sliders')
@Controller('sliders')
@UseGuards(PermissionGuard)
export class SlidersController {
    constructor(
        private slidersService: SlidersService
    ) { }

    @Permission()
    @Get()
    async getSliders(@Res() res) {
        return this.slidersService.getSliders(res);
    }

    @Permission()
    @Get('get/:id')
    async getSlider(@Res() res, @Param('id') id: number) {
        return this.slidersService.getSlider(res, id);
    }

    @Permission(16)
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post('create')
    async create(@Res() res, @Body() data: CreateSliderDto) {
        return this.slidersService.create(res, data);
    }

    @Permission(17)
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post('set/:id')
    async setSlider(@Res() res, @Param('id') id: number, @Body() data: SetSliderDto) {
        return this.slidersService.setSlider(res, id, data);
    }

    @Permission(18)
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post('del/:id')
    async delSlider(@Res() res, @Param('id') id: number) {
        return this.slidersService.delSlider(res, id);
    }

}
