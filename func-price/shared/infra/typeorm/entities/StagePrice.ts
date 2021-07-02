import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('stage_price')
class StagePrice {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    construction_id: number;

    @Column()
    stage: string;  
 
    @Column()
    description: string;  

    @Column(​​​​​​​​{​​​​​​​​ nullable: false, type: 'decimal', precision: 12, scale: 4 })
    amount: number;

    @CreateDateColumn({type: "timestamp"})
    creation_date: Date;

    @UpdateDateColumn({type: "timestamp"})
    last_update: Date;
}

export default StagePrice;