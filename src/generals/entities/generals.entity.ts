import { Language } from "../../language/entities/language.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('generals')
export class Generals {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', nullable: true})
    title: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @Column()
    slug: string;

    @Column({ nullable: true })
    img: string;

    @Column({ type: 'text', nullable: true })
    button: string;

    @Column({ type: 'text', nullable: true })
    href: string;

    @Column({ nullable: true})
    language_code: string;

    @ManyToOne(() => Language, language => language.generals, { cascade: true, onDelete: "SET NULL" })
    @JoinColumn({
        name: 'language_code',
        referencedColumnName: 'code',
        foreignKeyConstraintName: 'fk_g_language_code'
    })
    language: Language;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}