import { Body, Controller, FileTypeValidator, Get, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileTypeConstant } from 'constants/filetype.constant';
import { diskStorage } from 'multer';
import { Functions } from 'services/functions/functions';
import { PassAuth } from 'src/auth/guards/pass-auth.guard';
import { UploadPhotoDto } from 'src/media/dto/photo.dto';
import { Permission } from 'src/permissions/decorators/permission.decorator';
import { PermissionGuard } from 'src/permissions/guards/permission.guard';
import { UploadFileDto } from './dto/file.dto';

const func = new Functions;

@ApiBearerAuth()
@Controller('file')
@ApiTags('File')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @PassAuth()
  @Get(':route')
  async getMenus(@Param('route') type: string) {
    return await this.fileService.getMenus(type);
  }

  @Permission()
  @Post('upload/:route')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    limits: {
      fileSize: 10485760,
    },
    storage: diskStorage({
      destination: './assets/files/uploads/',
      filename: (req, file, cb) => { //cb = callback
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}` + '.' + `${file.mimetype.split('/')[1]}`)
      }
    })
  }))
  async uploadFile(@Body() files: UploadFileDto, @Param('route') route: string, @UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: FileTypeConstant.DOCUMENT })]
  })) file: Express.Multer.File) {
    const type = file.mimetype.split('/')[1]
    files.name = file.filename
    files.url = file.path
    files.alt = await func.fillEmpty(file.originalname)
    return await this.fileService.uploadFile(files, route, type)
  }
}
