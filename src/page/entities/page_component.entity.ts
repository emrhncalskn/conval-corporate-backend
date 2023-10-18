import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Page } from "./page.entity";
import { Component } from "./component.entity";

@Entity('page_component')
export class PageComponent {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    page_id: number;
    @Column()
    component_id: number;
    @Column()
    value: string;

    @ManyToOne(() => Page, page => page.page_component)
    @JoinColumn({ name: 'page_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_pc_page_id' })
    page: Page;

    // ManyToOne olmalı ve fk burada tanımlanmalı ( component_id burada) [DONE]
    @ManyToOne(() => Component, component => component.page_components)
    @JoinColumn({ name: 'component_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_pc_component_id' })
    component: Component;

}