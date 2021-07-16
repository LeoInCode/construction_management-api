import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Activity from "./Activity";
import Construction from "./Construction";
import Stage from "./Stage";

@Entity('information_activity')
class InformationActivity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    responsible: string; 

    @CreateDateColumn({type: "timestamp"})
    creation_date: Date;

    @UpdateDateColumn({type: "timestamp"})
    deadline: Date;

    @Column()
    description: string;
    
    @Column()
    description_img: string;

    @Column()
    progress: number;

    @Column()
    result: string;

    @Column()
    result_img: string;

    @JoinColumn({
        name: "construction_id", referencedColumnName: "id"
    })
    @ManyToOne(()=> Construction, (construction) => construction.stage_items)
    construction_id: Construction;

    @OneToOne(() => Activity, activity => activity.information_activity, {
        cascade: true,
        eager: true,
    })
    @JoinColumn({
        name: 'activity_id',
        referencedColumnName: 'id',
    })
    activity: Activity;
}

export default InformationActivity;