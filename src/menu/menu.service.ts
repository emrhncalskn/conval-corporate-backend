import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { MenuDto } from './dto/menu.dto';
import { Functions } from 'services/functions/functions';

const func = new Functions;

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>
    ) { }

    async getMenu(id: number) {
        return await this.menuRepository.findOne({ where: { id: id } });
    }

    async getMenuBySlug(slug: string) {
        return await this.menuRepository.findOne({ where: { slug: slug } });
    }

    async getMenus() {
        return await this.menuRepository.find();
    }

    async createMenu(data: MenuDto, res) {
        const isexist = await this.menuRepository.findOne({ where: { slug: data.slug } });
        if (isexist) { return res.status(400).send('Bu menü zaten mevcut.') }
        const newMenu = await this.menuRepository.create(data);
        newMenu.slug = await func.fillEmpty(newMenu.slug)
        const check = await this.menuRepository.save(newMenu);
        if (!check) { return res.status(400).send('Yeni menü oluştururken hata oluştu.') }
        return res.status(200).send('Yeni menü başarıyla oluşturuldu.')
    }

    async setMenu(data: MenuDto, id: number, res) {
        const isexist = await this.menuRepository.findOne({ where: { id: id } });
        if (!isexist) { return res.status(400).send('Menü bulunamadı.') }
        const check = await this.menuRepository.update(id, data);
        if (!check) { return res.status(400).send('Menü güncellenirken hata oluştu.') }
        return res.status(200).send('Menü başarıyla güncellendi.')
    }

    async deleteMenu(id: number, res) {
        const isexist = await this.menuRepository.findOne({ where: { id: id } });
        if (!isexist) { return res.status(400).send('Menü bulunamadı.') }
        const check = await this.menuRepository.delete(id);
        if (!check) { return res.status(400).send('Menü silinirken hata oluştu.') }
        return res.status(200).send('Menü başarıyla silindi.')
    }

}
