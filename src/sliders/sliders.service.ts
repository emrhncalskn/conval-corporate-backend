import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sliders } from './entities/sliders.entity';
import { Repository } from 'typeorm';
import { CreateSliderDto } from './dto/create-slider.dto';
import { Images } from 'src/users/entities/images.entity';
import { UploadPhotoDto } from 'src/users/dto/photo.dto';
import { Functions } from 'services/functions/functions';

const func = new Functions;

@Injectable()
export class SlidersService {
    constructor(
        @InjectRepository(Sliders)
        private slidersRepository: Repository<Sliders>,
        @InjectRepository(Images)
        private imagesRepository: Repository<Images>,
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

    async create(res, data: CreateSliderDto) {
        data.slug = String(await func.fillEmpty(data.stitle));
        const isexist = await this.slidersRepository.findOne({ where: { slug: data.slug } });
        if (isexist) { res.status(400).send({ message: "Bu slug zaten mevcut" }); return; }
        const newSlider = await this.slidersRepository.create(data);
        const check = await this.slidersRepository.save(newSlider);
        if (check) { res.status(201).send({ message: "Slider başarıyla oluşturuldu" }); return; }
        else { res.status(400).send({ message: "Slider oluşturulamadı" }); return; }
    }

    async setSlider(res, id: number, data: any) {
        data.slug = String(await func.fillEmpty(data.stitle));
        const slider = await this.slidersRepository.findOne({ where: { id: id } });
        const slug = await this.slidersRepository.findOne({ where: { slug: data.slug } });
        if (slug) { res.status(400).send({ message: "Bu slug zaten mevcut", slug: slug.slug }); return; }
        if (slider) {
            slider.stitle = data.stitle;
            slider.stext = data.stext;
            slider.simg = data.simg;
            slider.slug = data.slug;
            const check = await this.slidersRepository.save(slider);
            if (check) { res.status(201).send({ message: "Slider başarıyla güncellendi" }); return; }
            else { res.status(400).send({ message: "Slider güncellenemedi" }); return; }
        }
        else { res.status(400).send({ message: "Slider bulunamadı" }); return; }
    }

    async delSlider(res, id: number) {
        const slider = await this.slidersRepository.findOne({ where: { id: id } });
        if (slider) {
            const check = await this.slidersRepository.delete(slider.id);
            if (check.affected > 0) { res.status(201).send({ message: "Slider başarıyla silindi" }); return; }
            else { res.status(400).send({ message: "Slider silinemedi" }); return; }
        }
        else { res.status(400).send({ message: "Slider bulunamadı" }); return; }
    }

    async uploadPhoto(photoDto: UploadPhotoDto, uid: number) {
        const photo = await this.imagesRepository.create(photoDto);
        await this.imagesRepository.save(photo);
        await this.slidersRepository.update({ id: uid }, { simg: '/sliders/' + photo.iname });
        return '/sliders/' + photo.iname;
    }

}
