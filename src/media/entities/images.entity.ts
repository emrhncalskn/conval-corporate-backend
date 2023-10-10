import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('images')
export class Images {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    iname: string;
    @Column()
    itype: string;
    @Column()
    iurl: string;
    @Column()
    ialt: string;
    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}