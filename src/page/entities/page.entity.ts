import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PageConfig } from "./page_config.entity";
import { PageComponent } from "./page_component.entity";

@Entity('page')
export class Page {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    slug: string;
    @Column({ type: 'text' })
    content: string;
    @Column({ nullable: true })
    config_id: number;
    @OneToMany(() => PageComponent, page_component => page_component.page)
    page_component: PageComponent[];
    @ManyToOne(() => PageConfig, page_config => page_config.pages, { cascade: true, onDelete: "SET NULL" })
    @JoinColumn({
        name: 'config_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_p_config_id'
    })
    page_config: PageConfig;

}