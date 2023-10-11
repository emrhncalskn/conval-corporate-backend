import { Users } from "../../users/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('pages_extra')
export class PageExtra {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    author_id: number;
    @Column({ type: 'text', nullable: true })
    title: string;
    @Column({ type: 'text', nullable: true })
    excerpt: string;
    @Column({ type: 'text', nullable: true })
    body: string;
    @Column({ type: 'text', nullable: true })
    image: string;
    @Column()
    slug: string;
    @Column({ type: 'text', nullable: true })
    meta_description: string;
    @Column({ type: 'text', nullable: true })
    meta_keywords: string;
    @Column()
    status: number;
    @Column({ type: 'text', nullable: true })
    textimage: string;
    @Column({ type: 'text', nullable: true })
    breadimage: string;
    @Column({ type: 'text', nullable: true })
    titlesmall: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Users, author => author.page_extras)
    @JoinColumn({
        name: "author_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_pages_extra_author_id"
    })
    author: Users;
}