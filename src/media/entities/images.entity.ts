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
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}