import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('location')
export class Location {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column({ type: "text", nullable: true })
    description: string;
    @Column()
    lat: string;
    @Column()
    long: string;
    @Column({ type: "text", nullable: true })
    address: string;
    @Column({ type: "text", nullable: true })
    phone_numbers: string;
    @Column({ type: "text", nullable: true })
    emails: string;
}