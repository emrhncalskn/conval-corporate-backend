import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PageComponent } from "./page_component.entity";
import { ComponentFile } from "./component_file.entity";
import { ComponentType } from "./component_type.entity";

@Entity('component')
export class Component {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    type_id: number;
    @Column({ type: 'text' })
    css: string;

    @OneToMany(() => PageComponent, page_component => page_component.component)
    page_component: PageComponent[];

    @ManyToOne(() => ComponentType, component_type => component_type.component)
    @JoinColumn({ 
        name: 'type_id', 
        referencedColumnName: 'id', 
        foreignKeyConstraintName: 'fk_c_type_id' 
    })
    component_type: ComponentType;

    @OneToMany(() => ComponentFile, component_file => component_file.component)
    component_file: ComponentFile[];

    @OneToMany(() => PageComponent, page_component => page_component.component)
    page_components: PageComponent[];


}