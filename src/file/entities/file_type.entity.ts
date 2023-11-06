import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from "./file.entity";

@Entity('file_type')
export class FileType {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(() => File, file => file.file_type)
    file: File[];
}

