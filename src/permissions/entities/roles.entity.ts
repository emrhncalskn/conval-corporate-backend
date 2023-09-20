import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permissions } from './permissions.entity';

@Entity('roles')
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @OneToMany(() => Permissions, permissions => permissions.roles)
    permissions: Permissions[];
}