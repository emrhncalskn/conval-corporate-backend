import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Functions } from 'services/functions/functions';
import { Images } from 'src/media/entities/images.entity';
import { Repository } from 'typeorm';
import { CreatePageDto } from './dto/create-page.dto';
import { Pages } from './entities/pages.entity';

const func = new Functions;

@Injectable()
export class PagesService {
    constructor(
        @InjectRepository(Pages)
        private pagesRepository: Repository<Pages>,
        @InjectRepository(Images)
        private imagesRepository: Repository<Images>,
    ) { }

    async create(data: CreatePageDto, uid: number, res) {
        data.author_id = uid;
        data.slug = await func.fillEmpty(data.title);
        const isexist = await this.pagesRepository.findOne({ where: { slug: data.slug } });
        if (isexist) { return res.status(400).send({ message: 'Bu sayfa zaten mevcut.' }) }
        const check = await this.pagesRepository.create(data);
        if (!check) { return res.status(400).send({ message: 'Yeni sayfa oluştururken hata oluştu.' }) }
        await this.pagesRepository.save(check);
        return res.status(200).send({ message: 'Yeni sayfa başarıyla oluşturuldu.' })
    }

    async findAll(res) {
        const pages = await this.pagesRepository.find();
        if (!pages) { return res.status(400).send({ message: 'Sayfa bulunamadı.' }) }
        return res.status(200).send(pages);
    }

    async findOne(res, pageid: number) {
        const page = await this.pagesRepository.findOne({ where: { id: pageid } });
        if (!page) { return res.status(400).send({ message: 'Sayfa bulunamadı.' }) }
        return res.status(200).send(page);
    }

    async findBySlug(res, slug: string) {
        const page = await this.pagesRepository.findOne({ where: { slug: slug } });
        if (!page) { return res.status(400).send({ message: 'Sayfa bulunamadı.' }) }
        return res.status(200).send(page);
    }

    async update(pageid: number, data: CreatePageDto, uid: number, res) {
        const page = await this.pagesRepository.findOne({ where: { id: pageid } });
        if (!page) { return res.status(400).send({ message: 'Sayfa bulunamadı.' }) }
        Object.assign(page, data);
        if (data.title) {
            data.slug = await func.fillEmpty(data.title);
            if (data.slug !== page.slug) {
                const isexist = await this.pagesRepository.findOne({ where: { slug: data.slug } });
                if (isexist) { return res.status(400).send({ message: 'Bu sayfa zaten mevcut.' }) }
            }
        }
        const update = await this.pagesRepository.update({ id: pageid }, data);
        if (update.affected < 1 || uid !== page.author_id) return res.status(400).send({ message: 'Sayfa güncellenemedi.' });
        return res.status(200).send({ message: 'Sayfa başarıyla güncellendi.' })
    }

    async delete(pageid: number, uid: number, res) {
        const check = await this.pagesRepository.findOne({ where: { id: pageid } });
        if (!check) { return res.status(400).send({ message: 'Sayfa bulunamadı.' }) }
        if (uid !== check.author_id) { return res.status(400).send({ message: 'Bu sayfayı silme yetkiniz bulunmuyor.' }) }
        await this.pagesRepository.delete({ id: pageid });
        return res.status(200).send({ message: 'Sayfa başarıyla silindi.' })
    }
}
