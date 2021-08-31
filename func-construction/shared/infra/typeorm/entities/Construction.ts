import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @Column(​​​​​​​​)
    display_name: string;

    @Column()
    permissions_profile_id: string;

    @CreateDateColumn({type: "timestamp"})
    creation_date: Date;

    @UpdateDateColumn({type: "timestamp"})
    last_update: Date;

    @OneToMany(() => Stage, stage => stage.construction_id)
    stage_items: Stage[];
}

export default Construction;