import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('manpower_price')
class ManpowerPrice {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    construction_id: number;

    @Column()
    occupation: string;  
    
    @Column()
    service: string;

    @Column(​​​​​​​​{​​​​​​​​ nullable: false, type: 'decimal', precision: 12, scale: 4 })
    amount: number;

    @CreateDateColumn({type: "timestamp"})
    creation_date: Date;

    @UpdateDateColumn({type: "timestamp"})
    last_update: Date;
}

export default ManpowerPrice;