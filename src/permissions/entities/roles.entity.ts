import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permissions } from './permissions.entity';
import { Users } from '../../users/entities/users.entity';

@Entity('roles')
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @OneToMany(() => Permissions, permissions => permissions.role)
    permissions: Permissions[];

    @OneToMany(() => Users, users => users.role)
    users: Users[];
}