import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Functions } from './functions.entity';
import { Roles } from './roles.entity';

@Entity('permissions')
export class Permissions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role_id: number;

    @ManyToOne(() => Roles, role => role.permissions)
    @JoinColumn({
        name: "role_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_permissions_role_id"
    })
    role: Roles;

    @Column()
    func_id: number;

    @ManyToOne(() => Functions, func => func.permissions)
    @JoinColumn({
        name: "func_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_permissions_func_id"
    })
    function: Functions;

}