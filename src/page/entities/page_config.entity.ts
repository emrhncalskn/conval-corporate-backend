import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Page } from "./page.entity";

@Entity('page_config')
export class PageConfig {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    col_size: number;
    @OneToMany(() => Page, page => page.page_config)
    pages: Page[];
}