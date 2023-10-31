import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { Repository } from 'typeorm';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { CreateLanguageDto } from './dto/create-language.dto';
import { AppService } from 'src/app.service';

@Injectable()
export class LanguageService {
    constructor(
        @InjectRepository(Language)
        private languageRepository: Repository<Language>,
        private appService: AppService
    ) { }

    async getLanguages(res) {
        const languages = await this.languageRepository.find();
        if (!languages) { return res.send({ message: 'Dil bulunamadı.' }) }
        return res.send({ languages });
    }

    async getLanguageByCode(langcode: string, res) {
        const language = await this.languageRepository.findOne({ where: { code: langcode } });
        if (!language) { return res.send({ message: 'Dil bulunamadı.' }) }
        return res.send({ language });
    }

    async createLanguage(data: CreateLanguageDto, res) {
        const isExist = await this.languageRepository.findOne({ where: { code: data.code } });
        if (isExist) { return res.send({ message: 'Bu dil zaten mevcut.' }) }
        const language = await this.languageRepository.create(data);
        await this.languageRepository.save(language);
        if (!language) { return res.send({ message: 'Dil oluşturulamadı.' }) }
        return res.send({ message: 'Dil oluşturuldu.', language: language });
    }

    async setLanguageByCode(langcode: string, data: UpdateLanguageDto, res) {
        const language = await this.languageRepository.findOne({ where: { code: langcode } });
        if (!language) { return res.send({ message: 'Dil bulunamadı.' }) }
        Object.assign(language, data);
        const update = await this.languageRepository.update({ code: langcode }, data);
        if (update.affected < 1) return res.send({ message: 'Dil güncellenemedi.' });
        return res.send({ message: 'Dil güncellendi.' })
    }

    async deleteLanguageByCode(langcode: string, res) {
        const language = await this.languageRepository.findOne({ where: { code: langcode } });
        if (!language) { return res.send({ message: 'Dil bulunamadı.' }) }
        const remove = await this.languageRepository.remove(language);
        if (!remove) { return res.send({ message: 'Dil silinemedi.' }) }
        return res.send({ message: 'Dil silindi.' })
    }

}
