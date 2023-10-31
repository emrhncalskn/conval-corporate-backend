import { Language } from "../../language/entities/language.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('sliders')
export class Sliders extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    stitle: string;
    @Column({ type: 'text', nullable: true })
    stext: string;
    @Column()
    slug: string;
    @Column({ type: 'text', nullable: true })
    simg: string;
    @Column({ nullable: true })
    language_code: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Language, language => language.sliders, { cascade: true, onDelete: "SET NULL" })
    @JoinColumn({
        name: 'language_code',
        referencedColumnName: 'code',
        foreignKeyConstraintName: 'fk_s_language_code'
    })
    language: Language;

}