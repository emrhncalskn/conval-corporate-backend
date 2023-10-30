import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "./menu.entity";

@Entity('menu_type')
export class MenuType {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    slug: string;
    @Column()
    lang: string;

    @OneToMany(() => Menu, menu => menu.menu_type)
    menu: Menu[];
}