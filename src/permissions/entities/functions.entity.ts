import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permissions } from "./permissions.entity";

@Entity('functions')
export class Functions {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    desc: string;
    @Column()
    api: string;

    @OneToMany(() => Permissions, permissions => permissions.functions)
    permissions: Permissions[];
}