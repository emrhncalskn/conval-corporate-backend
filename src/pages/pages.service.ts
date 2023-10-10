import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagesEntity } from './entities/pages.entity';
import { CreatePageDto } from './dto/create-page.dto';
import { Functions } from 'services/functions/functions';
import { UploadPhotoDto } from 'src/users/dto/photo.dto';
import { Images } from 'src/users/entities/images.entity';

const func = new Functions;

@Injectable()
export class PagesService {
    constructor(
        @InjectRepository(PagesEntity)
        private pagesRepository: Repository<PagesEntity>,
        @InjectRepository(Images)
        private imagesRepository: Repository<Images>,
    ) { }

    async create(data: CreatePageDto, uid: number, res) {
        data.author_id = uid;
        data.title = data.title;
        data.excerpt = data.excerpt;
        data.body = data.body;
        data.slug = await func.fillEmpty(data.title);
        data.meta_description = data.meta_description;
        data.meta_keywords = data.meta_keywords;
        data.status = data.status;
        data.breadimage = data.breadimage;
        data.titlesmall = data.titlesmall;
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
        const check = await this.pagesRepository.findOne({ where: { id: pageid } });
        data.slug = await func.fillEmpty(data.title);
        const slug = await this.pagesRepository.findOne({ where: { slug: data.slug } });
        if (!check) { return res.status(400).send({ message: 'Sayfa bulunamadı.' }) }
        if (slug) { return res.status(400).send({ message: 'Bu sayfa zaten mevcut.', slug: slug.slug }) }
        if (uid !== check.author_id) { return res.status(400).send({ message: 'Bu sayfayı düzenleme yetkiniz bulunmuyor.' }) }
        check.title = data.title;
        check.excerpt = data.excerpt;
        check.slug = await func.fillEmpty(data.title);
        check.body = data.body;
        check.image = data.image;
        check.meta_description = data.meta_description;
        check.meta_keywords = data.meta_keywords;
        check.status = data.status;
        check.textimage = data.textimage;
        check.breadimage = data.breadimage;
        check.titlesmall = data.titlesmall;
        await this.pagesRepository.save(check);
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
