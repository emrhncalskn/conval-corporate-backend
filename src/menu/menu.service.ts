import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { CreateMenuDto, MenuTypeDto, UpdateMenuDto } from './dto/menu.dto';
import { Functions } from '../../services/functions/functions';
import { MenuType } from './entities/menu_type.entity';
import { Language } from 'src/language/entities/language.entity';

const func = new Functions();

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(MenuType)
    private menuTypeRepository: Repository<MenuType>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  async getMenu(id: number) {
    const menu = await this.menuRepository.findOne({ where: { id: id } });
    if (!menu) {
      return { message: 'Böyle bir menü yok!' };
    }
    return { menu };
  }

  async getMenuBySlug(slug: string) {
    const menu = await this.menuRepository.findOne({ where: { slug: slug } });
    if (!menu) {
      return { message: 'Böyle bir menü yok!' };
    }
    return { menu };
  }

  async getMenus() {
    const menu = await this.menuRepository.find();
    if (!menu) {
      return { message: 'Menü yok' };
    }
    const menus = [];
    for (let i = 0; i < menu.length; i++) {
      await this.getMenu(menu[i].id).then((res) => {
        menus.push(res);
      });
    }
    return { menus };
  }

  async getMenusWithType(slug: string, lang: string) {
    const menuType = await this.menuTypeRepository.findOne({
      where: { slug: slug, language_code: lang },
    });
    if (!menuType) {
      return { message: 'Böyle bir menü tipi yok!' };
    }
    const menu = await this.menuRepository.find({
      where: { type_id: menuType.id },
    });
    if (!menu) {
      return { message: 'Menü yok' };
    }
    const menus = [];
    for (let i = 0; i < menu.length; i++) {
      await this.getMenu(menu[i].id).then((res) => {
        menus.push(res);
      });
    }
    return { menus };
  }

  async createMenu(data: CreateMenuDto, res) {
    data.slug = await func.fillEmpty(data.title);
    const isexist = await this.menuRepository.findOne({
      where: { slug: data.slug },
    });
    if (isexist) {
      return res.status(400).send('Bu menü zaten mevcut.');
    }
    const newMenu = await this.menuRepository.create(data);
    const check = await this.menuRepository.save(newMenu);
    if (!check) {
      return res.status(400).send('Yeni menü oluştururken hata oluştu.');
    }
    return res.status(200).send('Yeni menü başarıyla oluşturuldu.');
  }

  async setMenu(data: UpdateMenuDto, id: number, res) {
    const menu = await this.menuRepository.findOne({ where: { id: id } });
    if (!menu) {
      return res.status(400).send('Menü bulunamadı.');
    }
    Object.assign(menu, data);
    const check = await this.menuRepository.update(id, data);
    if (!check) {
      return res.status(400).send('Menü güncellenirken hata oluştu.');
    }
    return res.status(200).send('Menü başarıyla güncellendi.');
  }

  async deleteMenu(id: number, res) {
    const menu = await this.menuRepository.findOne({ where: { id: id } });
    if (!menu) {
      return res.status(400).send('Menü bulunamadı.');
    }
    if (menu.menu_belong_id) {
      return res
        .status(400)
        .send('Bu menüye ait alt menüler var. Önce onları silmelisiniz.');
    }
    const check = await this.menuRepository.delete(id);
    if (!check) {
      return res.status(400).send('Menü silinirken hata oluştu.');
    }
    return res.status(200).send('Menü başarıyla silindi.');
  }

  async getMenuType(id: number) {
    const menuType = await this.menuTypeRepository.findOne({
      where: { id: id },
    });
    if (!menuType) {
      return { message: 'Böyle bir menü tipi yok!' };
    }
    return { menuType };
  }

  async getMenuTypeBySlug(slug: string) {
    const menuType = await this.menuTypeRepository.findOne({
      where: { slug: slug },
    });
    if (!menuType) {
      return { message: 'Böyle bir menü tipi yok!' };
    }
    return { menuType };
  }

  async getMenuTypes() {
    const menuType = await this.menuTypeRepository.find();
    if (!menuType) {
      return { message: 'Menü tipi yok' };
    }
    return { menuType };
  }

  async createMenuType(data: MenuTypeDto, res) {
    if (data.language_code) {
      const languages = await this.languageRepository.findOne({
        where: { code: data.language_code },
      });
      if (!languages) return res.send({ message: 'Dil bulunamadı.' });
    }
    const newMenuType = await this.menuTypeRepository.create(data);
    const check = await this.menuTypeRepository.save(newMenuType);
    if (!check) return res.send({ message: 'Menü tipi oluşturulamadı.' });
    return res.send({ message: 'Menü tipi oluşturuldu.' });
  }

  async setMenuType(data: MenuTypeDto, id: number, res) {
    const menutype = await this.menuTypeRepository.findOne({
      where: { id: id },
    });
    if (!menutype) return res.send({ message: 'Menü tipi bulunamadı.' });
    if (data.language_code) {
      const languages = await this.languageRepository.findOne({
        where: { code: data.language_code },
      });
      if (!languages) return res.send({ message: 'Dil bulunamadı.' });
    }
    Object.assign(menutype, data);
    const check = await this.menuTypeRepository.update(id, data);
    if (check.affected < 1)
      return res.send({ message: 'Menü tipi güncellenemedi.' });
    return res.send({ message: 'Menü tipi güncellendi.' });
  }

  async deleteMenuType(id: number, res) {
    const menutype = await this.menuTypeRepository.findOne({
      where: { id: id },
    });
    if (!menutype) return res.send({ message: 'Menü tipi bulunamadı.' });
    const check = await this.menuTypeRepository.delete(id);
    if (check.affected < 1)
      return res.send({ message: 'Menü tipi silinemedi.' });
    return res.send({ message: 'Menü tipi silindi.' });
  }
}
