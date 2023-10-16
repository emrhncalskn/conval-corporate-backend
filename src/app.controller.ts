import { Body, Controller, Get, Param, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { config } from 'dotenv';
import { Response } from 'express';
import { PassAuth } from './auth/guards/pass-auth.guard';

config()

@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }
  private url = process.env.SERVER_URL;

  @PassAuth()
  @Get('health-check')
  healthCheck(@Res() res): string {
    return this.appService.healthCheck(res);
  }

  @PassAuth()
  @Get('table-names')
  getTableNames(@Res() res: Response) {
    return this.appService.findTableNames(res);
  }

  @PassAuth()
  @Get('table/:table_name/:id')
  getTableSpecificData(@Res() res: Response, @Param('table_name') tableName: string, @Param('id') id: number) {
    return this.appService.findOneData(res, tableName, id);
  }

  @PassAuth()
  @Get('table/:table_name')
  getTableData(@Res() res: Response, @Param('table_name') tableName: string) {
    return this.appService.findTableData(res, tableName);
  }

  @PassAuth()
  @Post('table/:table_name')
  createTableData(@Res() res: Response, @Param('table_name') tableName: string, @Body() data) {
    return this.appService.createData(res, tableName, data);
  }

  @PassAuth()
  @Post('table/:table_name/update/:id')
  updateTableData(@Res() res: Response, @Param('table_name') tableName: string,@Param('id') id: number, @Body() data) {
    return this.appService.updateData(res, tableName, data, id);
  }
  @PassAuth()
  @Post('table/:table_name/delete/:id')
  deleteTableData(@Res() res: Response, @Param('table_name') tableName: string,@Param('id') id: number) {
    return this.appService.deleteData(res, tableName, id);
  }
}
