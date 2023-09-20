import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/permissions/guards/permission.guard';
import { Permission } from 'src/permissions/decorators/permission.decorator';
import { Functions } from 'services/functions/functions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadPhotoDto } from 'src/users/dto/photo.dto';

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

    @Permission(42)
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Get('get/:id')
    async findOne(@Res() res, @Param('id') id: number) {
        return await this.pagesService.findOne(res, id);
    }


    @Permission(29)
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post('create')
    async create(@Body() data: CreatePageDto, @Req() req, @Res() res) {
        return await this.pagesService.create(data, req.user.id, res);
    }

    @Permission(30)
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post('update/:id')
    async update(@Param('id') id: number, @Body() data: CreatePageDto, @Req() req, @Res() res) {
        return await this.pagesService.update(id, data, req.user.id, res);
    }

    @Permission(31)
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post('delete/:id')
    async delete(@Param('id') id: number, @Req() req, @Res() res) {
        return await this.pagesService.delete(id, req.user.id, res);
    }

    @Permission(37)
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiResponse({ status: 201, description: 'Ürün fotoğrafı ekler' })
    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './assets/images/uploads/pages/',
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
        return this.pagesService.uploadPhoto(photo, id)
    }

}
