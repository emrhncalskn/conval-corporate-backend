import { Users } from "../../users/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('pages')
export class Pages {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
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
    @Column()
    breadimage: string;
    @Column({ type: 'text', nullable: true })
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