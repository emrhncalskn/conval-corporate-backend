import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Functions } from 'services/functions/functions';
import { UploadPhotoDto } from './dto/photo.dto';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

const func = new Functions;

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @Post('upload/:type')
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
      destination: './assets/images/uploads/',
      filename: (req, file, cb) => { //cb = callback
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}` + '.' + `${file.mimetype.split('/')[1]}`)
      }
    })
  }))
  async uploadFile(@Body() files: UploadPhotoDto, @Param('type') type: string, @UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: /(jpg|png|jpeg)$/ })]
  })) file: Express.Multer.File) {
    files.itype = file.mimetype.split('/')[1]
    files.iname = file.filename
    files.iurl = file.path
    files.ialt = await func.fillEmpty(file.originalname)
    return await this.mediaService.uploadFile(files, type)
  }

}

// TODO dosya uzantılarını constanttan al
