import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "./menu.entity";
import { Language } from "../../language/entities/language.entity";

@Entity('menu_type')
export class MenuType {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    slug: string;

    @Column({ nullable: true})
    language_code: string;

    @ManyToOne(() => Language, language => language.generals, { cascade: true, onDelete: "SET NULL" })
    @JoinColumn({
        name: 'language_code',
        referencedColumnName: 'code',
        foreignKeyConstraintName: 'fk_mt_language_code'
    })
    language: Language;

    @OneToMany(() => Menu, menu => menu.menu_type)
    menu: Menu[];
}