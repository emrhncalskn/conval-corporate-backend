import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { File } from "../entities/file.entity";
import { Position } from "../entities/position.entity";

@Entity('application')
export class Application {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    position_id: number;
    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @Column()
    email: string;
    @Column({ type: "text", nullable: true })
    info: string;
    @Column()
    file_id: number;
    @ManyToOne(() => File, file => file.application)
    @JoinColumn({ name: "file_id", referencedColumnName: "id", foreignKeyConstraintName: 'fk_app_file_id' })
    file: File;
    @ManyToOne(() => Position, position => position.application)
    @JoinColumn({ name: "position_id", referencedColumnName: "id", foreignKeyConstraintName: 'fk_app_position_id' })
    position: Position;
}
