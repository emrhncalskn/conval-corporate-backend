import { Body, Controller, Get, Param, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { config } from 'dotenv';
import { Response } from 'express';

config()

@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    ) { }
  private url = process.env.SERVER_URL;
  
  @Get('health-check')
  healthCheck(@Res() res): string {
    return this.appService.healthCheck(res);
  }

  @Get('table-names')
  getTableNames(@Res() res : Response){
    return this.appService.findTableNames(res);
  }

  @Get('table/:table_name/:id')
  getTableSpecificData(@Res() res : Response, @Param('table_name') tableName: string,@Param('id') id: number){
    return this.appService.findOneData(res,tableName, id);
  }

  @Get('table/:table_name')
  getTableData(@Res() res : Response, @Param('table_name') tableName: string){
    return this.appService.findTableData(res,tableName);
  }
  @Post('table/:table_name')
  createTableData(@Res() res : Response, @Param('table_name') tableName: string,@Body() data: any){
    return this.appService.createData(res,tableName,data);
  }
}
