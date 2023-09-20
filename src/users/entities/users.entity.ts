import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
    @Column({ nullable: true })
    img: string;
    @Column({ nullable: true })
    img_type: string;
    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}