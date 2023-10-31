import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sliders } from './entities/sliders.entity';
import { Repository } from 'typeorm';
import { CreateSliderDto } from './dto/create-slider.dto';
import { Images } from '../../src/media/entities/images.entity';
import { Functions } from '../../services/functions/functions';
import { Response } from 'express';
import { SetSliderDto } from './dto/slider.dto';
import { Language } from 'src/language/entities/language.entity';

const func = new Functions;

@Injectable()
export class SlidersService {
    constructor(
        @InjectRepository(Sliders)
        private slidersRepository: Repository<Sliders>,
        @InjectRepository(Language)
        private languageRepository: Repository<Language>,
    ) { }

    async getSliders(res) {
        const sliders = await this.slidersRepository.find();
        if (sliders) { res.status(200).send(sliders); return; }
        else { res.status(400).send({ message: "Sliders bulunamadı" }); return; }
    }

    async getSlider(res, id: number) {
        const slider = await this.slidersRepository.findOne({ where: { id: id } });
        if (slider) { res.status(200).send(slider); return; }
        else { res.status(400).send({ message: "Slider bulunamadı" }); return; }
    }

    async create(res: Response, data: CreateSliderDto) {
        if (data.language_code) {
            const languages = await this.languageRepository.findOne({ where: { code: data.language_code } });
            if (!languages) return res.send({ message: 'Dil bulunamadı.' });
        }
        data.slug = String(await func.fillEmpty(data.stitle));
        const isexist = await this.slidersRepository.findOne({ where: { slug: data.slug } });
        if (isexist) { res.status(400).json({ message: "Bu slug zaten mevcut" }); return; }
        const newSlider = await this.slidersRepository.create(data);
        const check = await this.slidersRepository.save(newSlider);
        if (check) { res.status(201).json(check); return; }
        else { res.status(400).json({ message: "Slider oluşturulamadı" }); return; }
    }

    async setSlider(res: Response, id: number, data: SetSliderDto) {
        const slider = await this.slidersRepository.findOne({ where: { id: id } });
        if (slider) {
            if (data.language_code) {
                const languages = await this.languageRepository.findOne({ where: { code: data.language_code } });
                if (!languages) return res.send({ message: 'Dil bulunamadı.' });
            }
            Object.assign(slider, data);
            const check = await this.slidersRepository.update(id, data);
            if (check.affected > 0) { return res.status(201).send({ message: "Slider başarıyla güncellendi" }); }
            else { return res.status(400).send({ message: "Slider güncellenemedi" }); }
        }
        else { return res.status(400).send({ message: "Slider bulunamadı" }); }

    }

    async delSlider(res, id: number) {
        const slider = await this.slidersRepository.findOne({ where: { id: id } });
        if (slider) {
            const check = await this.slidersRepository.delete(id);
            if (check.affected > 0) { return res.status(201).send({ message: "Slider başarıyla silindi" }); }
            else { return res.status(400).send({ message: "Slider silinemedi" }); }
        }
        else { return res.status(400).send({ message: "Slider bulunamadı" }); }
    }

}
