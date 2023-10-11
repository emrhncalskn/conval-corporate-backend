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
    // type ve default verilmemeli
    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    // type ve default verilmemeli
    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}