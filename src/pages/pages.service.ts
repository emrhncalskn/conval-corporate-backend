import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Functions } from 'services/functions/functions';
import { Repository } from 'typeorm';
import { PageExtraDto } from './dto/create-page-extra.dto';
import { CreatePageDto } from './dto/create-page.dto';
import { Pages } from './entities/pages.entity';
import { PageExtra } from './entities/pages_extra.entity';

const func = new Functions;

@Injectable()
export class PagesService {
    constructor(
        @InjectRepository(Pages)
        private pagesRepository: Repository<Pages>,
        @InjectRepository(PageExtra)
        private pagesExtraRepository: Repository<PageExtra>,
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

    async findAllExtra(res) {
        const pages = await this.pagesExtraRepository.find();
        if (!pages) { return res.status(400).send({ message: 'Sayfa bulunamadı.' }) }
        return res.status(200).send(pages);
    }

    async findOneExtra(res, pageid: number) {
        const page = await this.pagesExtraRepository.findOne({ where: { id: pageid } });
        if (!page) { return res.status(400).send({ message: 'Sayfa bulunamadı.' }) }
        return res.status(200).send(page);
    }

    async findBySlugExtra(res, slug: string) {
        const page = await this.pagesExtraRepository.findOne({ where: { slug: slug } });
        if (!page) { return res.status(400).send({ message: 'Sayfa bulunamadı.' }) }
        return res.status(200).send(page);
    }

    async createExtra(data: PageExtraDto, uid: number, res) {
        let slug = ''
        if (data.title && !data.slug) { slug = await func.fillEmpty(data.title[0].title1); }
        const page = await this.pagesRepository.findOne({ where: { slug: data.slug } });
        if (page) { return res.status(400).send({ message: 'Böyle bir sayfa var' }) }
        const create = await this.pagesExtraRepository.create({
            author_id: uid,
            title: data.title ? JSON.stringify(data.title) : null,
            excerpt: data.excerpt ? JSON.stringify(data.excerpt) : null,
            body: data.body ? JSON.stringify(data.body) : null,
            image: data.image ? JSON.stringify(data.image) : null,
            slug: data.slug ? data.slug : slug,
            meta_description: data.meta_description ? JSON.stringify(data.meta_description) : null,
            meta_keywords: data.meta_keywords ? JSON.stringify(data.meta_keywords) : null,
            status: data.status ? data.status : 0,
            textimage: data.textimage ? JSON.stringify(data.textimage) : null,
            breadimage: data.breadimage ? JSON.stringify(data.breadimage) : null,
            titlesmall: data.titlesmall ? JSON.stringify(data.titlesmall) : null,
        });
        if (!create) { return res.status(400).send({ message: 'Sayfa oluşturulamadı.' }) }
        await this.pagesExtraRepository.save(create);
        return res.status(200).send({ message: 'Sayfa başarıyla oluşturuldu.' })
    }

    async updateExtra(pageid: number, data: PageExtraDto, uid: number, res) {
        const page = await this.pagesExtraRepository.findOne({ where: { id: pageid } });
        if (!page) { return res.status(400).send({ message: 'Sayfa bulunamadı.' }) }
        Object.assign(page, data);
        if (data.title) {
            data.slug = await func.fillEmpty(data.title[0].title1);
            if (data.slug !== page.slug) {
                const isexist = await this.pagesExtraRepository.findOne({ where: { slug: data.slug } });
                if (isexist) { return res.status(400).send({ message: 'Bu sayfa zaten mevcut.' }) }
            }
        }
        const update = await this.pagesExtraRepository.update({ id: pageid }, {
            author_id: uid,
            title: data.title ? JSON.stringify(data.title) : null,
            excerpt: data.excerpt ? JSON.stringify(data.excerpt) : null,
            body: data.body ? JSON.stringify(data.body) : null,
            image: data.image ? JSON.stringify(data.image) : null,
            slug: data.slug ? data.slug : page.slug,
            meta_description: data.meta_description ? JSON.stringify(data.meta_description) : null,
            meta_keywords: data.meta_keywords ? JSON.stringify(data.meta_keywords) : null,
            status: data.status ? data.status : 0,
            textimage: data.textimage ? JSON.stringify(data.textimage) : null,
            breadimage: data.breadimage ? JSON.stringify(data.breadimage) : null,
            titlesmall: data.titlesmall ? JSON.stringify(data.titlesmall) : null,
        });
        if (update.affected < 1) return res.status(400).send({ message: 'Sayfa güncellenemedi.' });
        return res.status(200).send({ message: 'Sayfa başarıyla güncellendi.' })
    }

    async deleteExtra(pageid: number, res) {
        const check = await this.pagesExtraRepository.findOne({ where: { id: pageid } });
        if (!check) { return res.status(400).send({ message: 'Sayfa bulunamadı.' }) }
        await this.pagesExtraRepository.delete({ id: pageid });
        return res.status(200).send({ message: 'Sayfa başarıyla silindi.' })
    }
}
