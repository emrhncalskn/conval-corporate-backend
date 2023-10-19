import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Roles } from '../../permissions/entities/roles.entity';
import { Blogs } from '../../blogs/entities/blogs.entity';

@Entity('users')
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstname: string;
    @Column()
    lastname: string;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column({ default: 0 })
    role_id: number;
    @Column({ nullable: true })
    img: string;
    @Column({ nullable: true })
    img_type: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Roles, role => role.users)
    @JoinColumn({
        name: "role_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_users_role_id"
    })
    role: Roles;

    @OneToMany(() => Blogs, blogs => blogs.author)
    blogs: Blogs[];
}