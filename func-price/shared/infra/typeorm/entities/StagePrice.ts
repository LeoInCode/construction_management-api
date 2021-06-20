import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('stage_price')
class StagePrice {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @PrimaryColumn()
    construction_id: number;

    @Column()
    stage: string;  
 
    @Column()
    description: string;  

    @Column(​​​​​​​​{​​​​​​​​ nullable: false, type: 'decimal', precision: 12, scale: 4 })
    amount: number;

    @Column({type: "timestamp"})
    creation_date: Date;

    @Column({type: "timestamp"})
    last_update: Date;
}

export default StagePrice;