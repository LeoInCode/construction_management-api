import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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
}

export default Stage;