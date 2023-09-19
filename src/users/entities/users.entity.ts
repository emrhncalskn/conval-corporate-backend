import { Entity, Column, DeleteDateColumn, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, } from 'typeorm';

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
    @Column()
    user_role: number;
    @Column()
    img: string;
    @Column()
    img_type: string;
    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;
    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;
}