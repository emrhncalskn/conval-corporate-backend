import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from './roles.entity';
import { Functions } from './functions.entity';

@Entity('permissions')
export class Permissions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role_id: number;
    @ManyToOne(() => Roles, roles => roles.permissions)
    @JoinColumn({
        name: "role_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "FK_permissions_roles"
    })
    roles: Roles;

    @Column()
    func_id: number;
    @ManyToOne(() => Functions, functions => functions.permissions)
    @JoinColumn({
        name: "func_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "FK_permissions_functions"
    })
    functions: Functions;

}