import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('sliders')
export class Sliders extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    stitle: string;
    @Column()
    stext: string;
    @Column()
    slug: string;
    @Column()
    simg: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

}