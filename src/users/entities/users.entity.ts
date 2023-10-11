import { PageExtra } from '../../pages/entities/pages_extra.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstname: string;
    @Column()
    lastname: string;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;
    //Join eksik role tablosuna join atılmalı.
    //önceki notlarda belirtilenlere göre duzenlenmeli
    //user_role --> role_id
    @Column()
    user_role: number;
    @Column({ nullable: true })
    img: string;
    @Column({ nullable: true })
    img_type: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}