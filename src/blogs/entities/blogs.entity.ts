import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('blogs')
export class Blogs {

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
    @Column({ nullable: true })
    img: string;
    @Column()
    slug: string;
    @Column()
    meta_description: string;
    @Column()
    meta_keywords: string;
    @Column()
    status: number;
    @Column()
    featured: number;
    @Column()
    favorites: number;
    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
