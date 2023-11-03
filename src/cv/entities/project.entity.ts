import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('project')
export class Project {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column({ type: "text", nullable: true })
    description: string;
    @Column()
    country_name: string;
    @Column()
    country_code: string;
}