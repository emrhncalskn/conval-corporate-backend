import { Body, Controller, FileTypeValidator, Get, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileTypeConstant } from 'constants/file.constant';
import { diskStorage } from 'multer';
import { Functions } from 'services/functions/functions';
import { PassAuth } from 'src/auth/guards/pass-auth.guard';
import { UploadPhotoDto } from 'src/media/dto/photo.dto';
import { Permission } from 'src/permissions/decorators/permission.decorator';
import { PermissionGuard } from 'src/permissions/guards/permission.guard';
import { UploadFileDto } from './dto/file.dto';
import { FileApiOptions, FileUploadOptions } from 'assets/files/file-options/file.options';

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
  @ApiBody(FileApiOptions())
  @UseInterceptors(FileInterceptor('file', FileUploadOptions()))
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
