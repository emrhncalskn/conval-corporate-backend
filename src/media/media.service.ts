import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from 'src/media/entities/images.entity';
import { Repository } from 'typeorm';
import { UploadPhotoDto } from './dto/photo.dto';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import path from 'path';

@Injectable()
export class MediaService {

    constructor(
        @InjectRepository(Images)
        private readonly imagesRepository: Repository<Images>,
    ) { }

    async getMenus(type: string) {
        let images = [];

        try {
            let files = [];
            if(type == 'all' || type == 'All' || type == 'ALL'){
                files = await fsPromises.readdir(`./assets/images/uploads/`, { recursive : true , encoding : 'utf-8' });
                files.forEach(file => {
                    const new_path = file.replace(/\\/g, '/'); // Burada da \\ getiriyordu onları / ile değiştirdik
                    if(new_path.split('/').length < 2) {return;} //  /xx/xx.png şeklinde olanları gostersin diye tek '/' olanları göstermemesını sagladık
                    images.push({ img: `/${new_path}` });
                });
            }else{
                files = await fsPromises.readdir(`./assets/images/uploads/${type}`);
                files.forEach(file => {
                    images.push({ img: `/${type}/${file}` });
                });
            }


            return { images };
        } catch (err) {
            console.error('Dosya okuma hatası:', err);
            return { images: [] };
        }
    }

    async uploadFile(fileDto: UploadPhotoDto, type: string) {
        const file = await this.imagesRepository.create(fileDto);
        let oldPath = './assets/images/uploads' + '/' + file.iname;
        let newPath = 'assets/images/uploads'
        if (type) {
            file.iurl = `${newPath}/${type}/${file.iname}`;
            await this.imagesRepository.save(file);
            let newProfilePhotoFolderPath = `./${newPath}/${type}`;
            if (!fs.existsSync(newProfilePhotoFolderPath)) { fs.mkdirSync(newProfilePhotoFolderPath); }
            fs.rename(oldPath, (`./${newPath}/${type}/${file.iname}`), (err) => {
                if (err) {
                    console.error('Dosya taşınırken hata oluştu! Error: ', err);
                } else {
                    console.log('Dosya başarıyla taşındı.');
                }
            })
        }

        else { return 400; }

        return `/${type}/${file.iname}`
    }

}
