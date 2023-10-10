import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Functions } from 'services/functions/functions';
import { Images } from 'src/media/entities/images.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/blog.dto';
import { Blogs } from './entities/blogs.entity';

const func = new Functions;

@Injectable()
export class BlogsService {
    constructor(
        @InjectRepository(Blogs)
        private readonly blogsRepository: Repository<Blogs>,
    ) { }

    async findAll() {
        return await this.blogsRepository.find({ order: { id: 'DESC' } });
    }

    async findOne(blogid: number, res) {
        const blog = await this.blogsRepository.findOne({ where: { id: blogid } })
        if (!blog) { return res.status(404).json({ message: 'Böyle bir haber yok!' }); }
        return res.status(200).json(blog);
    }

    async create(data: CreateBlogDto, res, userid: number) {
        data.slug = await func.fillEmpty(data.title);
        const isexist = await this.blogsRepository.findOne({ where: { slug: data.slug } });
        if (isexist) { return res.status(400).json({ message: 'Bu haber zaten mevcut.' }); }
        const blog = await this.blogsRepository.create(data);
        blog.slug = data.slug;
        blog.author_id = userid;
        await this.blogsRepository.save(blog);
        return res.status(200).json(blog);
    }

    async update(blogid: number, data: CreateBlogDto, res) {
        const blog = await this.blogsRepository.findOne({ where: { id: blogid } });
        if (!blog) { return res.status(404).json({ message: 'Böyle bir haber yok!' }); }
        Object.assign(blog, data)
        if (data.title) {
            data.slug = await func.fillEmpty(data.title);
            if (data.slug !== blog.slug) {
                const isexist = await this.blogsRepository.findOne({ where: { slug: data.slug } });
                if (isexist) { return res.status(400).json({ message: 'Bu haber zaten mevcut.' }); }
            }
        }
        const update = await this.blogsRepository.update({ id: blogid }, data);
        if (update.affected < 1) return res.status(400).json({ message: 'Haber güncellenemedi.' });
        return res.status(200).json({ message: 'Haber güncellendi.' });
    }

    async delete(blogid: number, res) {
        const blog = await this.blogsRepository.findOne({ where: { id: blogid } });
        if (!blog) { return res.status(404).json({ message: 'Böyle bir haber yok!' }); }
        await this.blogsRepository.delete({ id: blogid });
        return res.status(200).json({ message: 'Haber silindi.' });
    }

}
