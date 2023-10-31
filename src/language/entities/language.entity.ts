import { MenuType } from "../../menu/entities/menu_type.entity";
import { Generals } from "../../generals/entities/generals.entity";
import { Page } from "../../page/entities/page.entity";
import { Column, Entity, Index, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Sliders } from "../../sliders/entities/sliders.entity";

@Index('ui_code', ['code'], { unique: true })
@Entity('language')
export class Language {
    @PrimaryColumn()
    code: string;

    @Column()
    name: string;

    @OneToMany(() => Generals, generals => generals.language)
    generals: Generals[];

    @OneToMany(() => Page, pages => pages.language)
    pages: Page[];

    @OneToMany(() => MenuType, menu_types => menu_types.language)
    menu_types: MenuType[];

    @OneToMany(() => Sliders, sliders => sliders.language)
    sliders: Sliders[];
}
