import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FileType } from "./file_type.entity";
import { Application } from "../../cv/entities/application.entity";

@Entity('file')
export class File {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    alt: string;
    @Column({ type: "text" })
    url: string;
    @Column()
    type_id: number;
    @ManyToOne(() => FileType, file_type => file_type.file)
    @JoinColumn({ name: "type_id", referencedColumnName: "id", foreignKeyConstraintName: 'fk_f_type_id' })
    file_type: FileType;
    @OneToMany(() => Application, application => application.file_id)
    application: Application[];
}
