import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('testimonial')
export class Testimonial {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({ type: "text", nullable: true })
    content: string;
}