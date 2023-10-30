import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
import { Functions } from '../../services/functions/functions';
import { MenuType } from './entities/menu_type.entity';

const func = new Functions;

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>,
        @InjectRepository(MenuType)
        private menuTypeRepository: Repository<MenuType>,
    ) { }

    async getMenu(id: number) {
        const menu = await this.menuRepository.findOne({ where: { id: id } });
        if (!menu) { return { message: 'Böyle bir menü yok!' } }
        return { menu };
    }

    async getMenuBySlug(slug: string) {
        const menu = await this.menuRepository.findOne({ where: { slug: slug } });
        if (!menu) { return { message: 'Böyle bir menü yok!' } }
        return { menu };
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

    async getMenusWithType(slug: string, lang: string) {
        const menuType = await this.menuTypeRepository.findOne({ where: { slug: slug, lang: lang } });
        if (!menuType) { return { message: 'Böyle bir menü tipi yok!' } }
        const menu = await this.menuRepository.find({ where: { type_id: menuType.id, status: 1 } });
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
        const newMenu = await this.menuRepository.create(data);
        const check = await this.menuRepository.save(newMenu);
        if (!check) { return res.status(400).send('Yeni menü oluştururken hata oluştu.') }
        return res.status(200).send('Yeni menü başarıyla oluşturuldu.')
    }

    async setMenu(data: UpdateMenuDto, id: number, res) {
        const menu = await this.menuRepository.findOne({ where: { id: id } });
        if (!menu) { return res.status(400).send('Menü bulunamadı.') }
        Object.assign(menu, data);
        const check = await this.menuRepository.update(id, data);
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
