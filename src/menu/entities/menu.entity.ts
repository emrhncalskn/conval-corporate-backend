import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MenuType } from "./menu_type.entity";

@Entity('menu')
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column({ default: 1 })
    type_id: number;
    @Column()
    slug: string;
    @Column({ nullable: true })
    menu_belong: number; //sub-menu
    @Column({ type: 'text', nullable: true })
    route: string;
    @Column({ default: 0 })
    status: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => MenuType, menutype => menutype.menu, { cascade: true })
    @JoinColumn({ name: 'type_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_menu_type_id' })
    menutype: MenuType;

    @OneToMany(() => Menu, menu => menu.menu_belong_id)
    menu: Menu[];

    @ManyToOne(() => Menu, menu_belong_id => menu_belong_id.menu, { cascade: true })
    @JoinColumn({ name: 'menu_belong', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_menu_belong' })
    menu_belong_id: Menu;
}