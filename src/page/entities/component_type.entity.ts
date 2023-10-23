import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Component } from "./component.entity";

@Entity('component_type')
export class ComponentType {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    input_type: string;
    //OneToMany olmalı ve fk componentte tanımlanmalı [DONE]
    @OneToMany(() => Component, component => component.component_type)
    component: Component[];
}