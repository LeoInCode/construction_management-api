import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('construction_config')
class Construction {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    user_id: number;

    @Column()
    responsible: string;  
    
    @Column()
    client: string;

    @Column(​​​​​​​​)
    type: string;

    @Column(​​​​​​​​)
    display_name: string;

    @CreateDateColumn({type: "timestamp"})
    creation_date: Date;

    @UpdateDateColumn({type: "timestamp"})
    last_update: Date;
}

export default Construction;