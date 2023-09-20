import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeneralDto } from './dto/create-general.dto';
import { Images } from 'src/users/entities/images.entity';
import { UploadPhotoDto } from 'src/users/dto/photo.dto';
import { Generals } from './entities/generals.entity';

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

    async create(data: CreateGeneralDto, res) {
        const general = await this.generalsRepository.create(data);
        await this.generalsRepository.save(general);
        if (!general) { return res.status(400).send({ message: 'General oluşturulamadı.' }) }
        return res.status(200).send({ message: 'General oluşturuldu.', general: general });
    }

    async update(generalid: number, data: CreateGeneralDto, res) {
        const general = await this.generalsRepository.findOne({ where: { id: generalid } });
        if (!general) { return res.status(400).send({ message: 'General bulunamadı.' }) }
        await this.generalsRepository.update({ id: generalid }, data);
        return res.status(200).send({ message: 'General güncellendi.' });
    }

    async delete(generalid: number, res) {
        const general = await this.generalsRepository.findOne({ where: { id: generalid } });
        if (!general) { return res.status(400).send({ message: 'General bulunamadı.' }) }
        await this.generalsRepository.delete({ id: generalid });
        return res.status(200).send({ message: 'General silindi.' });
    }

    async uploadPhoto(photoDto: UploadPhotoDto, uid: number) {
        const photo = await this.imagesRepository.create(photoDto);
        await this.imagesRepository.save(photo);
        await this.generalsRepository.update({ id: uid }, { img: `/generals/${photo.iname}` });
        return `/generals/${photo.iname}`;
    }
}
