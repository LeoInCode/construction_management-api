import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import PermissionsConstruction from "./PermissionsConstruction";
import Stage from "./Stage";

@Entity('construction_config')
class Construction {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    responsible: string;
    
    @Column()
    client: string;

    @Column(​​​​​​​​)
    type: string;

    @Column()
    profile_id: string

    @Column(​​​​​​​​)
    display_name: string;

    @CreateDateColumn({type: "timestamp"})
    creation_date: Date;

    @UpdateDateColumn({type: "timestamp"})
    last_update: Date;

    @OneToMany(() => Stage, stage => stage.construction_id)
    stage_items: Stage[];

    @OneToMany(() => PermissionsConstruction, permissions => permissions.construction_id)
    permissions: PermissionsConstruction[];
}

export default Construction;