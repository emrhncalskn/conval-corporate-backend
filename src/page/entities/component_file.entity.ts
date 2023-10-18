import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Component } from "./component.entity";

@Entity('component_file')
export class ComponentFile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    component_id: number;

    @Column()
    file_id: number;

    @ManyToOne(() => Component, component => component.component_file)
    @JoinColumn({ name: 'component_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_cf_component_id' })
    component: Component;

    @ManyToOne(() => Component, component => component.component_file)
    @JoinColumn({ name: 'file_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_cf_file_id' })
    file: Component;
    // file_id burada fk tanımlanım relation atılmalı [DONE]
}