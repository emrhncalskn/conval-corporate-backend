import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSidebarDto } from './dto/create-sidebar.dto';
import { Images } from 'src/users/entities/images.entity';
import { UploadPhotoDto } from 'src/users/dto/photo.dto';
import { Sidebars } from './entities/sidebars.entity';

@Injectable()
export class SidebarsService {
    constructor(
        @InjectRepository(Sidebars)
        private sidebarsRepository: Repository<Sidebars>,
        @InjectRepository(Images)
        private imagesRepository: Repository<Images>,
    ) { }

    async findAll(res) {
        const sidebars = await this.sidebarsRepository.find();
        if (!sidebars) { return res.status(400).send({ message: 'Sidebar bulunamadı.' }) }
        return res.status(200).send(sidebars);
    }

    async findOne(res, sidebarid: number) {
        const sidebar = await this.sidebarsRepository.findOne({ where: { id: sidebarid } });
        if (!sidebar) { return res.status(400).send({ message: 'Sidebar bulunamadı.' }) }
        return res.status(200).send(sidebar);
    }

    async create(data: CreateSidebarDto, userid: number, res) {
        const sidebar = await this.sidebarsRepository.create(data);
        await this.sidebarsRepository.save(sidebar);
        if (!sidebar) { return res.status(400).send({ message: 'Sidebar oluşturulamadı.' }) }
        return res.status(200).send({ message: 'Sidebar oluşturuldu.', sidebar: sidebar });
    }

    async update(sidebarid: number, data: CreateSidebarDto, userid: number, res) {
        const sidebar = await this.sidebarsRepository.findOne({ where: { id: sidebarid } });
        if (!sidebar) { return res.status(400).send({ message: 'Sidebar bulunamadı.' }) }
        await this.sidebarsRepository.update({ id: sidebarid }, data);
        return res.status(200).send({ message: 'Sidebar güncellendi.' });
    }

    async delete(sidebarid: number, userid: number, res) {
        const sidebar = await this.sidebarsRepository.findOne({ where: { id: sidebarid } });
        if (!sidebar) { return res.status(400).send({ message: 'Sidebar bulunamadı.' }) }
        await this.sidebarsRepository.delete({ id: sidebarid });
        return res.status(200).send({ message: 'Sidebar silindi.' });
    }

    async uploadPhoto(photoDto: UploadPhotoDto, uid: number) {
        const photo = await this.imagesRepository.create(photoDto);
        await this.imagesRepository.save(photo);
        await this.sidebarsRepository.update({ id: uid }, { img: `/sidebars/${photo.iname}` });
        return `/sidebar/${photo.iname}`;
    }
}
