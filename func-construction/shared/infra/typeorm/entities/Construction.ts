import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Stage from "./Stage";
import User from "./User";

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
    user_permissions: string;

    @Column(​​​​​​​​)
    display_name: string;

    @CreateDateColumn({type: "timestamp"})
    creation_date: Date;

    @UpdateDateColumn({type: "timestamp"})
    last_update: Date;

    @JoinColumn({
        name: "user_id", referencedColumnName: "id"
    })
    @ManyToOne(()=> User, (user) => user.construction_items)
    user_id: User;

    @OneToMany(() => Stage, stage => stage.construction_id)
    stage_items: Stage[];
}

export default Construction;