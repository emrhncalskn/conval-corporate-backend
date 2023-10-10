import { Body, Controller, FileTypeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Functions } from 'services/functions/functions';
import { UploadPhotoDto } from './dto/photo.dto';
import { MediaService } from './media.service';
import { FileTypeConstant } from 'constants/filetype.constant';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

const func = new Functions;

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('media')
@ApiTags('Media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

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
      destination: './assets/images/uploads/',
      filename: (req, file, cb) => { //cb = callback
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}` + '.' + `${file.mimetype.split('/')[1]}`)
      }
    })
  }))
  async uploadFile(@Body() files: UploadPhotoDto, @Param('route') route: string, @UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: FileTypeConstant.IMAGE })]
  })) file: Express.Multer.File) {
    files.itype = file.mimetype.split('/')[1]
    files.iname = file.filename
    files.iurl = file.path
    files.ialt = await func.fillEmpty(file.originalname)
    return await this.mediaService.uploadFile(files, route)
  }

}
