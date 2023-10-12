import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
import { Functions } from 'services/functions/functions';
import { Pages } from 'src/pages/entities/pages.entity';

const func = new Functions;

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>,
        @InjectRepository(Pages)
        private pagesRepository: Repository<Pages>,
    ) { }

    async getMenu(id: number) {
        const menu = await this.menuRepository.findOne({ where: { id: id } });
        if (!menu) { return { message: 'Böyle bir menü yok!' } }
        if (!menu.page_belongs) { return { menu, pages: [] } }
        const pageBelongs = JSON.parse(menu.page_belongs);
        let pages = [];
        for (let i = 0; i < pageBelongs.length; i++) {
            const page = await this.pagesRepository.findOne({ where: { id: pageBelongs[i].id } });
            pages.push(page);
        }
        const { page_belongs, ...rest } = menu;
        return { menu: rest, pages };
    }

    async getMenuBySlug(slug: string) {
        const menu = await this.menuRepository.findOne({ where: { slug: slug } });
        if (!menu) { return { message: 'Böyle bir menü yok!' } }
        if (!menu.page_belongs) { return { menu, pages: [] } }
        const pageBelongs = JSON.parse(menu.page_belongs);
        let pages = [];
        for (let i = 0; i < pageBelongs.length; i++) {
            const page = await this.pagesRepository.findOne({ where: { id: pageBelongs[i].id } });
            pages.push(page);
        }
        const { page_belongs, ...rest } = menu;
        return { menu: rest, pages };
    }

    async getMenus() {
        const menu = await this.menuRepository.find({ where: { status: 1 } });
        if (!menu) { return { message: 'Menü yok' } }
        const menus = [];
        for (let i = 0; i < menu.length; i++) {
            await this.getMenu(menu[i].id).then(res => {
                menus.push(res);
            }
            );
        }
        return { menus };
    }

    async createMenu(data: CreateMenuDto, res) {
        data.slug = await func.fillEmpty(data.title);
        const isexist = await this.menuRepository.findOne({ where: { slug: data.slug } });
        if (isexist) { return res.status(400).send('Bu menü zaten mevcut.') }
        const page_belongs = JSON.stringify(data.page_belongs);
        const newMenu = await this.menuRepository.create({ ...data, page_belongs: page_belongs });
        const check = await this.menuRepository.save(newMenu);
        if (!check) { return res.status(400).send('Yeni menü oluştururken hata oluştu.') }
        return res.status(200).send('Yeni menü başarıyla oluşturuldu.')
    }

    async setMenu(data: UpdateMenuDto, id: number, res) {
        const menu = await this.menuRepository.findOne({ where: { id: id } });
        if (!menu) { return res.status(400).send('Menü bulunamadı.') }
        Object.assign(menu, data);
        const page_belongs = JSON.stringify(data.page_belongs);
        const check = await this.menuRepository.update(id, { ...data, page_belongs: page_belongs });
        if (!check) { return res.status(400).send('Menü güncellenirken hata oluştu.') }
        return res.status(200).send('Menü başarıyla güncellendi.')
    }

    async deleteMenu(id: number, res) {
        const menu = await this.menuRepository.findOne({ where: { id: id } });
        if (!menu) { return res.status(400).send('Menü bulunamadı.') }
        if (menu.menu_belong_id) { return res.status(400).send('Bu menüye ait alt menüler var. Önce onları silmelisiniz.') }
        const check = await this.menuRepository.delete(id);
        if (!check) { return res.status(400).send('Menü silinirken hata oluştu.') }
        return res.status(200).send('Menü başarıyla silindi.')
    }

}
