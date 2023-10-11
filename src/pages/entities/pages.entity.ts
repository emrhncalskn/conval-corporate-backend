import { Users } from "../../users/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('pages')
export class Pages {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    author_id: number;
    @Column()
    title: string;
    @Column()
    excerpt: string;
    @Column()
    body: string;
    @Column()
    image: string;
    @Column()
    slug: string;
    @Column()
    meta_description: string;
    @Column()
    meta_keywords: string;
    @Column()
    status: number;
    @Column()
    textimage: string;
    @Column()
    breadimage: string;
    @Column()
    titlesmall: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Users, author => author.pages)
    @JoinColumn({
        name: "author_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_pages_author_id"
    })
    author: Users;
}