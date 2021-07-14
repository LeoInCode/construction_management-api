import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Construction from "./Construction";
import Stage from "./Stage";

@Entity('activity')
class Activity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    activity_name: string;  

    @CreateDateColumn({type: "timestamp"})
    creation_date: Date;

    @UpdateDateColumn({type: "timestamp"})
    last_update: Date;

    @JoinColumn({
        name: "construction_id", referencedColumnName: "id"
    })
    @ManyToOne(()=> Construction, (construction) => construction.stage_items)
    construction_id: Construction;

    @JoinColumn({
        name: "stage_id", referencedColumnName: "id"
    })
    @ManyToOne(()=> Stage, (stage) => stage.activity_items)
    stage_id: Stage;
}

export default Activity;