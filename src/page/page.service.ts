import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageComponentDto, PageConfigDto, PageDto, UpdatePageDto } from './dto/page.dto';
import { Component } from './entities/component.entity';
import { ComponentFile } from './entities/component_file.entity';
import { ComponentType } from './entities/component_type.entity';
import { Page } from './entities/page.entity';
import { PageComponent } from './entities/page_component.entity';
import { PageConfig } from './entities/page_config.entity';
import { ComponentDto, ComponentFileDto, ComponentTypeDto } from './dto/component.dto';
import { Functions } from 'services/functions/functions';

const func = new Functions;

@Injectable()
export class PageService {

    constructor(
        @InjectRepository(Page)
        private pageRepository: Repository<Page>,
        @InjectRepository(PageConfig)
        private pageConfigRepository: Repository<PageConfig>,
        @InjectRepository(PageComponent)
        private pageComponentRepository: Repository<PageComponent>,
        @InjectRepository(Component)
        private componentRepository: Repository<Component>,
        @InjectRepository(ComponentFile)
        private componentFileRepository: Repository<ComponentFile>,
        @InjectRepository(ComponentType)
        private componentTypeRepository: Repository<ComponentType>,
    ) { }

    // Page

    async getPages(res) {
        const pages = await this.pageRepository.find({ relations: { page_config: true, page_component: true } });
        if (pages.length > 0) {
            pages.forEach(element => {
                element.content = JSON.parse(element.content);
            });
            return res.status(200).send(pages);
        }
        else return res.status(404).send({ message: 'Sayfa bulunamadı.' });
    }

    async getPageBySlug(slug: string, res) {
        const page = await this.pageRepository.findOne({ where: { slug: slug }, relations: { page_config: true, page_component: true } });
        if (page) {
            page.content = JSON.parse(page.content);
            return res.status(200).json(page);
        }
        else return res.status(404).send({ message: 'Sayfa bulunamadı.' });
    }

    async getPage(page_id: number, res) {
        const page = await this.pageRepository.findOne({ where: { id: page_id }, relations: { page_config: true, page_component: true } });
        if (page) {
            page.content = JSON.parse(page.content);
            return res.status(200).json(page);
        }
        else return res.status(404).send({ message: 'Sayfa bulunamadı.' });
    }

    async createPage(data: PageDto, res) {
        let msg: string;
        !data.content || !data.content[0] == true ? msg = 'Sayfa içeriği boş olamaz.' :
            data.title == '' ? msg = 'Sayfa başlığı boş olamaz.' : msg = null;
        if (msg) return res.send({ message: msg })

        const components = [];
        for (let i = 0; i < data.content.length; i++) {
            const component = await this.componentRepository.findOne({ where: { id: data.content[i]['component_id'] } });
            if (component) {
                if (!data.content[i]['component_id'] || !data.content[i]['value']) { return res.send({ message: 'Content yanlış formatta gönderildi!', content: data.content[i] }); }
                components.push(data.content[i]);
            }
            else
                return res.send({ message: `ID:${data.content[i]['component_id']} numaralı component bulunamadı.` })
        }

        if (!data.slug) data.slug = await func.fillEmpty(data.title);

        data.content = JSON.stringify(data.content);
        const page = this.pageRepository.create(data);
        const check = await this.pageRepository.save(page);
        const result = await this.setPageComponents(components, page);
        if (result == null) {
            return res.status(400).send({ message: 'Sayfa oluştururken hata oluştu.' });
        }
        const newPage = await this.pageRepository.findOne({ where: { id: check.id }, relations: { page_component: true } });
        delete newPage.page_component;
        delete newPage.content;
        if (check) { return res.status(200).json({ newPage, content: result }); }
        return res.status(400).send({ message: 'Sayfa oluştururken hata oluştu.' });
    }

    async setPage(page_id: number, data: UpdatePageDto, res) {

        let msg: string;
        data.title == '' ? msg = 'Sayfa başlığı boş olamaz.' : msg = null;
        if (msg) return res.send({ message: msg })

        const page = await this.pageRepository.findOne({ where: { id: page_id } });
        if (!page) return res.status(404).send({ message: 'Sayfa bulunamadı.' });

        //content yok ise basic sayfa update
        if (!data.content) {
            const newPage = Object.assign(page, data);
            const updatePage = await this.pageRepository.update(page_id, newPage)
            if (updatePage) return res.status(200).json(newPage);
            else return res.status(400).send({ message: 'Sayfa güncellenirken hata oluştu.' });
        }

        //page'e yeni componentler ekler
        const components = [];
        for (let i = 0; i < data.content.length; i++) {
            const component = await this.componentRepository.findOne({ where: { id: data.content[i]['component_id'] } });
            if (component) {
                if (!data.content[i]['component_id'] || !data.content[i]['value']) { return res.send({ message: 'Content yanlış formatta gönderildi!', content: data.content[i] }); }
                components.push(data.content[i]);
            }
            else
                return res.send({ message: `ID:${data.content[i]['component_id']} numaralı component bulunamadı.` })
        }

        const result = await this.setPageComponents(components, page);
        if (result == null) {
            return res.status(400).send({ message: 'Sayfa güncellenirken hata oluştu.' });
        }

        data.content = JSON.stringify(JSON.parse(page.content).concat(data.content));

        const updateContent = await this.pageRepository.update(page_id, data);
        if (updateContent) {
            const newPage = await this.pageRepository.findOne({ where: { id: page_id }, relations: { page_component: true } });
            const newComponents = result;
            delete newPage.page_component;
            newPage.content = JSON.parse(newPage.content);
            return res.status(200).json({ newPage, newComponents });
        }
        else return res.status(400).send({ message: 'Sayfa güncellenirken hata oluştu.' });

    }

    async deletePage(page_id: number, res) {
        const page = await this.pageRepository.findOne({ where: { id: page_id } });
        if (page) {
            const components = await this.pageComponentRepository.find({ where: { page_id: page_id } });
            if (components.length > 0) {
                for (let i = 0; i < components.length; i++) {
                    const check = await this.pageComponentRepository.delete(components[i].id);
                    if (!check) return res.status(400).send({ message: 'Sayfa componentleri silinirken hata oluştu.' });
                }
            }
            const checkDelete = await this.pageRepository.delete(page_id);
            if (checkDelete) { return res.status(200).json({ message: "Sayfa ve sayfaya bağlı componentler silindi." }); }
            else return res.status(400).send({ message: 'Sayfa silinirken hata oluştu.' });
        }
        else return res.status(404).send({ message: 'Sayfa bulunamadı.' });
    }
    // --------------------------------------------------------------------------------------------------------------

    // Page Component
    async getPageComponents(res) {
        const pageComponents = await this.pageComponentRepository.find();
        if (pageComponents.length > 0) { return res.status(200).json(pageComponents); }
        else return res.status(404).send({ message: 'Sayfa componenti bulunamadı.' });
    }

    async getPageComponent(component_id: number, res) {
        const pageComponent = await this.pageComponentRepository.findOne({ where: { id: component_id } });
        if (pageComponent) { return res.status(200).json(pageComponent); }
        else return res.status(404).send({ message: 'Sayfa componenti bulunamadı.' });
    }

    async createPageComponent(data: PageComponentDto) {
        const pageComponent = await this.pageComponentRepository.create(data);
        const check = await this.pageComponentRepository.save(pageComponent);
        const page = await this.pageRepository.findOne({ where: { id: data.page_id } });
        page.content = JSON.stringify(JSON.parse(page.content).concat({ component_id: data.component_id, value: data.value }));
        const updatePage = await this.pageRepository.update(data.page_id, page);
        if (check && updatePage) { return pageComponent; }
        return 400;
    }

    async setPageComponent(component_id: number, data: PageComponentDto, res) {
        const pageComponent = await this.pageComponentRepository.findOne({ where: { id: component_id } });
        const page = await this.pageRepository.findOne({ where: { id: data.page_id } });
        const component = await this.componentRepository.findOne({ where: { id: data.component_id } });

        let msg: string;
        !page ? msg = 'Sayfa bulunamadı.' :
            !pageComponent ? msg = 'Sayfa componenti bulunamadı.' :
                !component ? msg = 'Component bulunamadı.' :
                    !data.page_id ? msg = 'Sayfa idsi boş olamaz.' :
                        !data.value ? msg = 'Value boş olamaz.' : msg = null;
        if (msg) return res.status(404).json({ message: msg });

        if (data.page_id == pageComponent.page_id) {  // sayfa değişmediyse
            page.content = JSON.parse(page.content);
            for (let i = 0; i < page.content.length; i++) {
                if (page.content[i]['value'] == pageComponent.value) {
                    page.content[i]['value'] = data.value;
                    break;
                }
            }
            Object.assign(pageComponent, data);
            page.content = JSON.stringify(page.content);
            const updatePageComponent = await this.pageComponentRepository.update(component_id, data);
            const updatePageContent = await this.pageRepository.update(data.page_id, page);
            if (updatePageComponent && updatePageContent) return res.status(200).json({ message: 'Sayfa componenti başarı ile güncellendi.' });
            else return res.status(400).json({ message: 'Sayfa componenti güncellenirken hata oluştu.' });
        }

        if (data.page_id !== pageComponent.page_id) {   // sayfa değiştiyse
            const oldPage = await this.pageRepository.findOne({ where: { id: pageComponent.page_id } });
            oldPage.content = JSON.parse(oldPage.content);
            const arr = [];
            for (let i = 0; i < oldPage.content.length; i++) {
                arr.push(oldPage.content[i]);
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i]['value'] == pageComponent.value) {
                    arr.splice(i, 1);
                    break;
                }
            }
            oldPage.content = JSON.stringify(arr);
            const updateOldPage = await this.pageRepository.update(oldPage.id, oldPage); //Eski sayfayı günceller
            const updatePageComponent = await this.pageComponentRepository.update(component_id, data); // Sayfa componentlerini günceller
            pageComponent.value = data.value;
            page.content = JSON.stringify(JSON.parse(page.content).concat({ component_id: pageComponent.component_id, value: pageComponent.value }));
            const updatePage = await this.pageRepository.update(data.page_id, page); // Yeni sayfayı günceller
            if (updateOldPage && updatePage && updatePageComponent) return res.status(200).json({ message: 'Sayfa componenti başarı ile güncellendi.', newPage: page, oldPage: oldPage });
            else return res.status(400).json({ message: 'Sayfa componenti güncellenirken hata oluştu.' });

        }

    }

    async setPageComponents(components: any[], page: Page) {
        let page_comps: PageComponent[] = [];
        components.forEach(async element => {
            let pageComponent = this.pageComponentRepository.create({ page_id: page.id, component_id: element.component_id, value: element.value });
            page_comps.push(pageComponent);
        });
        const result = await this.pageComponentRepository.save(page_comps);
        if (result) {
            return result;
        } else {
            return null;
        }
    }

    async deletePageComponent(component_id: number, res) {
        const pageComponent = await this.pageComponentRepository.findOne({ where: { id: component_id } });
        const page = await this.pageRepository.findOne({ where: { id: pageComponent.page_id } });
        let msg = !page ? 'Sayfa bulunamadı.' :
            !pageComponent ? 'Sayfa componenti bulunamadı.' : 'Hata oluştu.';
        if (pageComponent && page) {
            const check = await this.pageComponentRepository.delete(component_id);
            if (check) {
                page.content = JSON.parse(page.content);
                const arr = [];
                for (let i = 0; i < page.content.length; i++) {
                    arr.push(page.content[i]);
                }
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]['value'] == pageComponent.value) {
                        arr.splice(i, 1);
                        break;
                    }
                }
                page.content = JSON.stringify(arr);
                const updatePage = await this.pageRepository.update(page.id, page);
                if (updatePage) return res.status(200).json({ message: "Sayfa componenti silindi." });
                else return res.status(400).send({ message: 'Sayfa componenti silinirken hata oluştu.' });
            }
        }
        else return res.status(404).send({ msg });
    }

    async getPageComponentsIndex(page_id: number, res) {
        const index = await this.pageComponentRepository.find({ where: { page_id: page_id }, select: ['component_id', 'value', 'index'], order: { index: 'ASC' } });
        if (!index && index.length < 1) { return res.send({ message: 'Sayfa componentleri bulunamadı.' }) }
        return res.send(index);
    }

    async setPageComponentIndex(page_id: number, component_id: number, index: number, res) {
        const pageComponent = await this.pageComponentRepository.findOne({ where: { page_id: page_id, id: component_id } });
        if (pageComponent) {
            pageComponent.index = index;
            const check = await this.pageComponentRepository.update(component_id, pageComponent);
            if (check) { return res.status(200).send({ message: 'Sayfa componenti indexi başarı ile güncellendi.' }); }
            else return res.status(400).send({ message: 'Sayfa componenti indexi güncellenirken hata oluştu.' });
        }
        else return res.status(404).send({ message: 'Sayfa componenti bulunamadı.' });
    }

    // --------------------------------------------------------------------------------------------------------------

    // Page Config
    async getPageConfigs(res) {
        const pageConfigs = await this.pageConfigRepository.find();
        if (pageConfigs.length > 0) { return res.status(200).json(pageConfigs); }
        else return res.status(404).send({ message: 'Sayfa ayarı bulunamadı.' });
    }

    async getPageConfig(config_id: number, res) {
        const pageConfig = await this.pageConfigRepository.findOne({ where: { id: config_id } });
        if (pageConfig) { return res.status(200).json(pageConfig); }
        else return res.status(404).send({ message: 'Sayfa ayarı bulunamadı.' });
    }

    async createPageConfig(data: PageConfigDto, res) {
        const page = await this.pageRepository.findOne({ where: { id: data.page_id } });
        if (!page) return res.status(404).json({ message: 'Sayfa bulunamadı.' });
        const pageConfig = await this.pageConfigRepository.create(data);
        pageConfig.page = page;
        const check = await this.pageConfigRepository.save(pageConfig);
        if (check) { return res.status(200).json(pageConfig); }
        return res.status(400).send({ message: 'Sayfa ayarı oluştururken hata oluştu.' });
    }


    async setPageConfig(config_id: number, data: PageConfigDto, res) {
        const pageConfig = await this.pageConfigRepository.findOne({ where: { id: config_id } });
        if (pageConfig) {
            const updatedPageConfig = Object.assign(pageConfig, data);
            const check = await this.pageConfigRepository.update(config_id, data);
            if (check) { return res.status(200).send({ updatedPageConfig }); }
            else return res.status(400).send({ message: 'Sayfa ayarı güncellenirken hata oluştu.' });
        }
        else return res.status(404).send({ message: 'Sayfa ayarı bulunamadı.' });
    }

    async deletePageConfig(config_id: number, res) {
        const pageConfig = await this.pageConfigRepository.findOne({ where: { id: config_id } });
        if (pageConfig) {
            const check = await this.pageConfigRepository.delete(config_id);
            if (check) { return res.status(200).json({ message: "Sayfa ayarı silindi." }); }
            else return res.status(400).send({ message: 'Sayfa ayarı silinirken hata oluştu.' });
        }
        else return res.status(404).send({ message: 'Sayfa ayarı bulunamadı.' });
    }
    // --------------------------------------------------------------------------------------------------------------

    // Component Type
    async getComponentTypes(res) {
        const componentTypes = await this.componentTypeRepository.find();
        if (componentTypes.length > 0) { return res.status(200).json(componentTypes); }
        else return res.status(404).send({ message: 'Component tipi bulunamadı.' });
    }

    async getComponentType(type_id: number, res) {
        const componentType = await this.componentTypeRepository.findOne({ where: { id: type_id } });
        if (componentType) { return res.status(200).json(componentType); }
        else return res.status(404).send({ message: 'Component tipi bulunamadı.' });
    }

    async createComponentType(data: ComponentTypeDto, res) {
        const componentType = await this.componentTypeRepository.create(data);
        const check = await this.componentTypeRepository.save(componentType);
        if (check) { return res.status(200).json(componentType); }
        return res.status(400);
    }

    async setComponentType(type_id: number, data: ComponentTypeDto, res) {
        const componentType = await this.componentTypeRepository.findOne({ where: { id: type_id } });
        if (componentType) {
            Object.assign(componentType, data);
            const check = await this.componentTypeRepository.update(type_id, data);
            if (check) { return res.status(200).send({ message: 'Compenent tipi başarıyla güncellendi.' }); }
            else return res.status(400).send({ message: 'Component tipi güncellenirken hata oluştu.' });
        }
        else return res.status(404).send({ message: 'Component tipi bulunamadı.' });
    }

    async deleteComponentType(type_id: number, res) {
        const component = await this.componentRepository.findOne({ where: { type_id: type_id } });
        if (component) return res.status(400).send({ message: 'Bu component tipi, başka bir component tarafından kullanıyor.' });
        const componentType = await this.componentTypeRepository.findOne({ where: { id: type_id } });
        if (componentType) {
            const check = await this.componentTypeRepository.delete(type_id);
            if (check) { return res.status(200).send({ message: 'Component tipi başarı ile silindi.' }); }
            else return res.status(400).send({ message: 'Component tipi silinirken hata oluştu.' });
        }
        else return res.status(404).send({ message: 'Component tipi bulunamadı.' });
    }
    // --------------------------------------------------------------------------------------------------------------


    // Component
    async getComponents(res) {
        const components = await this.componentRepository.find();
        if (components.length > 0) { return res.status(200).json(components); }
        else return res.status(404).send({ message: 'Component bulunamadı.' });
    }

    async getComponent(component_id: number, res) {
        const component = await this.componentRepository.findOne({ where: { id: component_id } });
        if (component) { return res.status(200).json(component); }
        else return res.status(404).send({ message: 'Component bulunamadı.' });
    }

    async createComponent(data: ComponentDto, res) {
        const componentType = await this.componentTypeRepository.findOne({ where: { id: data.type_id } });
        if (!componentType) return res.status(404).send({ message: 'Component tipi bulunamadı.' });
        const component = await this.componentRepository.create(data);
        const check = await this.componentRepository.save(component);
        if (check) { return res.send(component); }
        return res.status(400).send({ message: 'Component oluştururken hata oluştu.' });
    }

    async setComponent(component_id: number, data: ComponentDto, res) {
        const component = await this.componentRepository.findOne({ where: { id: component_id } });
        if (component) {
            Object.assign(component, data);
            const check = await this.componentRepository.update(component_id, data);
            if (check) { return res.status(200).send({ message: 'Component başarı ile güncellendi.' }); }
            else return res.status(400).send({ message: 'Component güncellenirken hata oluştu.' });
        }
        else return res.status(404).send({ message: 'Component bulunamadı.' });
    }

    async deleteComponent(component_id: number, res) {
        const pageComponent = await this.pageComponentRepository.findOne({ where: { component_id: component_id } });
        if (pageComponent) return res.status(400).send({ message: 'Sayfa componenti, bu componenti kullanıyor.' });
        const component = await this.componentRepository.findOne({ where: { id: component_id } });
        if (component) {
            const check = await this.componentRepository.delete(component_id);
            if (check) { return res.status(200).send({ message: 'Component başarıyla silindi.' }); }
            else return res.status(400).send({ message: 'Component silinirken hata oluştu.' });
        }
        else return res.status(404).send({ message: 'Component bulunamadı.' });
    }
    // --------------------------------------------------------------------------------------------------------------


    /*
    async createComponentFile(data: ComponentFileDto, res) {
        const componentFile = await this.componentFileRepository.create(data);
        const check = await this.componentFileRepository.save(componentFile);
        if (check) { return res.status(200).json(componentFile); }
        return res.status(400);
    }
 
    async getComponentFiles(res) {
        const componentFiles = await this.componentFileRepository.find();
        if (componentFiles.length > 0) { return res.status(200).json(componentFiles); }
        else return res.status(404);
    }
 
 
    async getComponentFile(file_id: number, res) {
        const componentFile = await this.componentFileRepository.findOne({ where: { id: file_id } });
        if (componentFile) { return res.status(200).json(componentFile); }
        else return res.status(404);
    }
 
 
    async setPageComponent(component_id: number, data: PageComponentDto, res) {
        const pageComponent = await this.pageComponentRepository.findOne({ where: { id: component_id } });
        if (pageComponent) {
            Object.assign(pageComponent, data);
            const check = await this.pageComponentRepository.update(component_id, data);
            if (check) { return res.status(200); }
            else return res.status(400);
        }
        else return res.status(404);
    }
 
    async setComponent(component_id: number, data: ComponentDto, res) {
        const component = await this.componentRepository.findOne({ where: { id: component_id } });
        if (component) {
            Object.assign(component, data);
            const check = await this.componentRepository.update(component_id, data);
            if (check) { return res.status(200); }
            else return res.status(400);
        }
        else return res.status(404);
    }
 
    async setComponentFile(file_id: number, data: ComponentFileDto, res) {
        const componentFile = await this.componentFileRepository.findOne({ where: { id: file_id } });
        if (componentFile) {
            Object.assign(componentFile, data);
            const check = await this.componentFileRepository.update(file_id, data);
            if (check) { return res.status(200); }
            else return res.status(400);
        }
        else return res.status(404);
    }
 
    async deleteComponentFile(file_id: number, res) {
        const componentFile = await this.componentFileRepository.findOne({ where: { id: file_id } });
        if (componentFile) {
            const check = await this.componentFileRepository.delete(file_id);
            if (check) { return res.status(200); }
            else return res.status(400);
        }
        else return res.status(404);
    }
 
    */
}
