import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blogs } from './entities/blogs.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/blog.dto';
import { Functions } from 'services/functions/functions';
import { Images } from 'src/users/entities/images.entity';
import { UploadPhotoDto } from 'src/users/dto/photo.dto';

const func = new Functions;

@Injectable()
export class BlogsService {
    constructor(
        @InjectRepository(Blogs)
        private readonly blogsRepository: Repository<Blogs>,
        @InjectRepository(Images)
        private readonly imagesRepository: Repository<Images>,
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
        const blog = await this.blogsRepository.create(data);
        blog.author_id = userid;
        blog.slug = await func.slugCreator(data.title);
        await this.blogsRepository.save(blog);
        return res.status(200).json(blog);
    }

    async update(blogid: number, data: CreateBlogDto, res) {
        const blog = await this.blogsRepository.findOne({ where: { id: blogid } });
        if (!blog) { return res.status(404).json({ message: 'Böyle bir haber yok!' }); }
        data.slug = await func.slugCreator(data.title);
        await this.blogsRepository.update({ id: blogid }, data);
        return res.status(200).json({ message: 'Haber güncellendi.' });
    }

    async delete(blogid: number, res) {
        const blog = await this.blogsRepository.findOne({ where: { id: blogid } });
        if (!blog) { return res.status(404).json({ message: 'Böyle bir haber yok!' }); }
        await this.blogsRepository.delete({ id: blogid });
        return res.status(200).json({ message: 'Haber silindi.' });
    }

    async uploadPhoto(photoDto: UploadPhotoDto, uid: number) {
        const photo = this.imagesRepository.create(photoDto);
        await this.imagesRepository.save(photo);
        await this.blogsRepository.update({ id: uid }, { img: `/blogs/${photo.iname}` });
        return `/blogs/${photo.iname}`;
    }
}
