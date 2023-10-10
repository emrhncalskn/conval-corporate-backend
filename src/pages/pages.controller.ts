import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Functions } from 'services/functions/functions';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { Permission } from 'src/permissions/decorators/permission.decorator';
import { PermissionGuard } from 'src/permissions/guards/permission.guard';
import { CreatePageDto } from './dto/create-page.dto';
import { PagesService } from './pages.service';
import { PageExtraDto } from './dto/create-page-extra.dto';

const func = new Functions;

@ApiTags('Pages')
@UseGuards(PermissionGuard)
@Controller('pages')
export class PagesController {
    constructor(
        private pagesService: PagesService,
    ) { }

    @Permission()
    @Get()
    async findAll(@Res() res) {
        return await this.pagesService.findAll(res);
    }

    @Permission()
    @Get('getbyslug/:slug')
    async findBySlug(@Res() res, @Param('slug') slug: string) {
        return await this.pagesService.findBySlug(res, slug);
    }

    @Permission(24)
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Get('get/:id')
    async findOne(@Res() res, @Param('id') id: number) {
        return await this.pagesService.findOne(res, id);
    }


    @Permission(25)
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post('create')
    async create(@Body() data: CreatePageDto, @Req() req, @Res() res) {
        return await this.pagesService.create(data, req.user.id, res);
    }

    @Permission(26)
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post('update/:id')
    async update(@Param('id') id: number, @Body() data: CreatePageDto, @Req() req, @Res() res) {
        return await this.pagesService.update(id, data, req.user.id, res);
    }

    @Permission(27)
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post('delete/:id')
    async delete(@Param('id') id: number, @Req() req, @Res() res) {
        return await this.pagesService.delete(id, req.user.id, res);
    }

    @Permission()
    @Get('extra/getall')
    async getAllExtra(@Res() res) {
        return await this.pagesService.findAllExtra(res);
    }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Permission()
    @Get('extra/get/:id')
    async getExtra(@Param('id') id: number, @Res() res) {
        return await this.pagesService.findOneExtra(res, id);
    }

    @Permission()
    @Get('extra/getbyslug/:slug')
    async getExtraBySlug(@Param('slug') slug: string, @Res() res) {
        return await this.pagesService.findBySlugExtra(res, slug);
    }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Permission()
    @Post('extra/create')
    async createExtra(@Body() data: PageExtraDto, @Req() req, @Res() res) {
        return await this.pagesService.createExtra(data, req.user.id, res);
    }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Permission()
    @Post('extra/update/:id')
    async updateExtra(@Param('id') id: number, @Body() data: PageExtraDto, @Req() req, @Res() res) {
        return await this.pagesService.updateExtra(id, data, req.user.id, res);
    }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Permission()
    @Post('extra/delete/:id')
    async deleteExtra(@Param('id') id: number, @Res() res) {
        return await this.pagesService.deleteExtra(id, res);
    }
}
