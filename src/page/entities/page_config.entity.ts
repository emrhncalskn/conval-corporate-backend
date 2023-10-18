import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Page } from "./page.entity";

@Entity('page_config')
export class PageConfig {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    col_size: number;

    // OneToOne olmalı ve fk Page Entity de tanımlanmalı [DONE]
    @OneToOne(() => Page, page => page.page_config)
    page: Page;
}