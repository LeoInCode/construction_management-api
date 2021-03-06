import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Activity from "./Activity";
import Construction from "./Construction";

@Entity('stage')
class Stage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    stage_name: string;  

    @CreateDateColumn({type: "timestamp"})
    creation_date: Date;

    @UpdateDateColumn({type: "timestamp"})
    last_update: Date;

    @JoinColumn({
        name: "construction_id", referencedColumnName: "id"
    })
    @ManyToOne(()=> Construction, (construction) => construction.stage_items)
    construction_id: Construction;

    @OneToMany(() => Activity, activity => activity.stage_id)
    activity_items: Activity[];
}

export default Stage;