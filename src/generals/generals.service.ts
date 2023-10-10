import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneralDto } from './dto/general.dto';
import { Images } from 'src/media/entities/images.entity';
import { UploadPhotoDto } from 'src/media/dto/photo.dto';
import { Generals } from './entities/generals.entity';
import { Functions } from 'services/functions/functions';

const func = new Functions;

@Injectable()
export class GeneralsService {
    constructor(
        @InjectRepository(Generals)
        private generalsRepository: Repository<Generals>,
        @InjectRepository(Images)
        private imagesRepository: Repository<Images>,
    ) { }

    async findAll(res) {
        const generals = await this.generalsRepository.find();
        if (!generals) { return res.status(400).send({ message: 'General bulunamadı.' }) }
        return res.status(200).send(generals);
    }

    async findOne(res, generalid: number) {
        const general = await this.generalsRepository.findOne({ where: { id: generalid } });
        if (!general) { return res.status(400).send({ message: 'General bulunamadı.' }) }
        return res.status(200).send(general);
    }

    async findBySlug(res, slug: string) {
        const general = await this.generalsRepository.findOne({ where: { slug: slug } });
        if (!general) { return res.status(400).send({ message: 'General bulunamadı.' }) }
        return res.status(200).send(general);
    }

    async create(data: GeneralDto, res) {
        const general = await this.generalsRepository.create(data);
        if (!data.slug) { general.slug = await func.fillEmpty(data.title) }
        await this.generalsRepository.save(general);
        if (!general) { return res.status(400).send({ message: 'General oluşturulamadı.' }) }
        return res.status(200).send({ message: 'General oluşturuldu.', general: general });
    }

    async update(generalid: number, data: GeneralDto, res) {
        const general = await this.generalsRepository.findOne({ where: { id: generalid } });
        if (!general) { return res.status(400).send({ message: 'General bulunamadı.' }) }
        Object.assign(general, data);
        if (data.title) {
            data.slug = await func.fillEmpty(data.title);
            if (data.slug !== general.slug) {
                const isexist = await this.generalsRepository.findOne({ where: { slug: data.slug } });
                if (isexist) { return res.status(400).json({ message: 'Bu general zaten mevcut.' }); }
            }
        }

        const update = await this.generalsRepository.update({ id: generalid }, data);
        if (update.affected < 1) return res.status(400).send({ message: 'General güncellenemedi.' });
        return res.status(200).send({ message: 'General güncellendi.' });
    }

    async delete(generalid: number, res) {
        const general = await this.generalsRepository.findOne({ where: { id: generalid } });
        if (!general) { return res.status(400).send({ message: 'General bulunamadı.' }) }
        await this.generalsRepository.delete({ id: generalid });
        return res.status(200).send({ message: 'General silindi.' });
    }
}
