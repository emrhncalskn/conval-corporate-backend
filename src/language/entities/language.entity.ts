import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('language')
export class Language {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;
}
