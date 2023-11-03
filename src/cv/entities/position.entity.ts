import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Application } from "../entities/application.entity";

@Entity('position')
export class Position {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column({ type: "text", nullable: true })
    description: string;
    @Column()
    is_active: number;
    @Column({ type: "text", nullable: true })
    image_url: string;
    @OneToMany(() => Application, application => application.position)
    application: Application[];
}