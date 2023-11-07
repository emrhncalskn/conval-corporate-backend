import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Connection } from 'typeorm';
import { config } from 'dotenv';
import { GeneralGetDto } from './app.dto';

config();

@Injectable()
export class AppService {
  constructor(private readonly connection: Connection) { }

  async findOneData(res: Response, tableName: string, id: number) {
    try {
      const repository = this.connection.getRepository(tableName);
      const result = await repository.findOne({ where: { id: id } });
      res.status(200).json(result);
      return;
    } catch (error) {
      res.status(400).json(error);
      return;
    }
  }

  async findTableData(res: Response, tableName: string) {
    try {
      const repository = this.connection.getRepository(tableName);
      const result = await repository.find();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
    return;
  }

  async findTableDataWithWhere(res: Response, tableName: string, dto : GeneralGetDto) {
    try {
      const repository = this.connection.getRepository(tableName);
      let where : string = "";
      dto.body.forEach(element => {
        where += element.key + " = '" + element.value + "' AND ";
      });
      where = where.substring(0, where.length - 4);
      const result = await repository.createQueryBuilder(tableName).where(where).getMany();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error.sqlMessage);
    }
    return;
  }

  async findTableNames(res: Response): Promise<any> {
    console.log(" db_name :: " + process.env.DB_DATABASE);
    const tableNames = await this.connection.query(
      "SELECT table_name as 'table_name' , JSON_ARRAYAGG(JSON_OBJECT('name',column_name , 'type' , data_type)) as 'columns' from information_schema.columns WHERE table_schema ='" + process.env.DB_DATABASE + "' GROUP BY table_name",
      [process.env.DB_DATABASE] // Şema adını burada belirtin
    );
    tableNames.forEach(element => {
      element.columns = JSON.parse(element.columns);
      element.columns.forEach(table_element => {
        const type = table_element.type;
        // Veri Kontrolü ve dönüşüm alanı
        if(["int", "bigint", "tinyint"].includes(type)){
          table_element.type = "number";
        }else if(["varchar","datetime"].includes(type)){
          table_element.type = "string";
        }else if(["text","long"].includes(type)){
          table_element.type = "string";
          table_element["inputType"] = "textarea";
        }
        // ------------------------------
      });
    });
    res.status(200).json(tableNames);
    return;
  }

  async createData(res: Response, tableName: string, data: any) {
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
  async updateData(res: Response, tableName: string, data: any, id: number) {
    try {
      const repository = this.connection.getRepository(tableName);
      const update_data = await repository.findOne({ where: { id: id } });
      if (!update_data) {
        res.status(400).json({ message: 'Data not found' });
        return;
      }
      const new_data = Object.assign(update_data, data);
      const result = await repository.save(new_data);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
    return;
  }

  async deleteData(res: Response, tableName: string, id: number) {
    try {
      const repository = this.connection.getRepository(tableName);
      const delete_data = await repository.findOne({ where: { id: id } });
      if (!delete_data) {
        res.status(400).json({ message: 'Data not found' });
        return;
      }
      const result = await repository.delete({id: id});
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
    return;
  }

  healthCheck(res: Response): string {
    res.status(200).json('OK');
    return "Ok.";
  }
}
