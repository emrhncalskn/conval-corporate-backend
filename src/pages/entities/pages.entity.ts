import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('pages')
export class Pages {
    @PrimaryGeneratedColumn()
    id: number;
    // Join olmalı mı?
    // author_id ye eğer user id atılıyorsa join atılmalı
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
}