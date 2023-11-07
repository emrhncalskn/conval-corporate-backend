import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { UploadFileDto } from './dto/file.dto';
import { FileType } from './entities/file_type.entity';
import { FileDestinationConstant } from 'constants/file.constant';

@Injectable()
export class FileService {

    constructor(
        @InjectRepository(File)
        private readonly filesRepository: Repository<File>,
        @InjectRepository(FileType)
        private readonly fileTypeRepository: Repository<FileType>,
    ) { }

    async getMenus(type: string) {
        let documents = [];

        try {
            let files = [];
            if (type == 'all' || type == 'All' || type == 'ALL') {
                files = await fsPromises.readdir(`./assets/files/uploads/`, { recursive: true, encoding: 'utf-8' });
                files.forEach(file => {
                    const new_path = file.replace(/\\/g, '/'); // Burada da \\ getiriyordu onları / ile değiştirdik
                    if (new_path.split('/').length < 2) { return; } //  /xx/xx.png şeklinde olanları gostersin diye tek '/' olanları göstermemesını sagladık
                    documents.push({ file: `/${new_path}` });
                });
            } else {
                files = await fsPromises.readdir(`./assets/files/uploads/${type}`);
                files.forEach(file => {
                    documents.push({ file: `/${type}/${file}` });
                });
            }


            return { documents };
        } catch (err) {
            console.error('Dosya okuma hatası:', err);
            return { documents: [] };
        }
    }

    async uploadFile(fileDto: UploadFileDto, route: string, type: string) {
        const findType = await this.fileTypeRepository.findOne({ where: { name: type }, relations: ['file'] });
        if (!findType) { return 404; }
        fileDto.type_id = findType.id;
        const file = await this.filesRepository.create(fileDto);
        let oldPath = FileDestinationConstant.OLD_PATH + file.name;
        let newPath = FileDestinationConstant.NEW_PATH;
        if (route) {
            file.url = `${newPath}/${route}/${file.name}`;
            await this.filesRepository.save(file);
            let newFileFolderPath = `./${newPath}/${route}`;
            if (!fs.existsSync(newFileFolderPath)) { fs.mkdirSync(newFileFolderPath); }
            fs.rename(oldPath, (`./${newPath}/${route}/${file.name}`), (err) => {
                if (err) {
                    console.error('Dosya taşınırken hata oluştu! Error: ', err);
                } else {
                    console.log('Dosya başarıyla taşındı.');
                }
            })
        }

        else { return 400; }

        return `/${route}/${file.name}`
    }

}
