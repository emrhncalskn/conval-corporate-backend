import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('sliders')
export class Sliders extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    stitle: string;
    @Column({ type: 'text', nullable: true })
    stext: string;
    @Column()
    slug: string;
    @Column({ type: 'text', nullable: true })
    simg: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

}