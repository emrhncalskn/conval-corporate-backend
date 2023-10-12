import { Users } from "../../users/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('blogs')
export class Blogs {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    author_id: number;
    @Column()
    title: string;
    @Column({ type: 'text', nullable: true })
    excerpt: string;
    @Column({ type: 'text', nullable: true })
    body: string;
    @Column({ nullable: true })
    img: string;
    @Column()
    slug: string;
    @Column({ type: 'text', nullable: true })
    meta_description: string;
    @Column({ type: 'text', nullable: true })
    meta_keywords: string;
    @Column()
    status: number;
    @Column()
    featured: number;
    @Column()
    favorites: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Users, author => author.blogs)
    @JoinColumn({
        name: "author_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_blogs_author_id"
    })
    author: Users;
}
