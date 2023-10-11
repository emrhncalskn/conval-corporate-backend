import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('generals')
export class Generals {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    slug: string;
    @Column({ nullable: true })
    img: string;
    @Column({ type: 'text', nullable: true })
    button: string;
    @Column({ type: 'text', nullable: true })
    href: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}