import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('reference')
export class Reference {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    order: string;
    @Column({ type: "text", nullable: true })
    image_url: string;
}