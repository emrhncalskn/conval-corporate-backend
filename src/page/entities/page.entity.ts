import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PageConfig } from "./page_config.entity";
import { PageComponent } from "./page_component.entity";
import { Language } from "../../language/entities/language.entity";

@Entity('page')
export class Page {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    image: string;
    
    @Column({ nullable: true })
    background_image: string;

    @Column()
    slug: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ nullable: true })
    config_id: number;

    @Column({ nullable: true })
    language_code: string;

    @ManyToOne(() => Language, language => language.pages, { cascade: true, onDelete: "SET NULL" })
    @JoinColumn({
        name: 'language_code',
        referencedColumnName: 'code',
        foreignKeyConstraintName: 'fk_p_language_code'
    })
    language: Language;

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