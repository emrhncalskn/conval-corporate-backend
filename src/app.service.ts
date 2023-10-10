import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Connection } from 'typeorm';
import { config } from 'dotenv';

config();

@Injectable()
export class AppService {
  constructor(private readonly connection: Connection) {}

  async findOneData(res: Response, tableName: string, id: number){
    try {
      const repository = this.connection.getRepository(tableName);
      const result = await repository.findOne({ where: { id: id }});
      res.status(200).json(result);
      return;
    } catch (error) {
      res.status(400).json(error);
      return;
    }
  }

  async findTableData(res: Response,tableName: string){
    try {
      const repository = this.connection.getRepository(tableName);
      const result = await repository.find();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
    return;
  }

  async findTableNames(res: Response): Promise<any> {
    console.log(" db_name :: " + process.env.DB_DATABASE);
    const tableNames = await this.connection.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema ='"+process.env.DB_DATABASE+"'",
      [process.env.DB_DATABASE] // Şema adını burada belirtin
    );
    res.status(200).json(tableNames);
    return;
  }

  async createData(res: Response, tableName: string, data: any){
    try {
      const repository = this.connection.getRepository(tableName);
      const new_data = repository.create(data);
      const result = await repository.save(new_data);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
    return;
      
  }

  healthCheck(res : Response): string {
    res.status(200).json('OK');
    return;
  }
}
