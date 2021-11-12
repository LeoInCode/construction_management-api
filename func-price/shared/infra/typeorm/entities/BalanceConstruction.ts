import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('balance_construction')
class BalanceConstruction {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    construction_id: number;

    @Column()
    month: string;  

    @Column(​​​​​​​​{​​​​​​​​ nullable: false, type: 'decimal', precision: 12, scale: 4 })
    amount: number;

    @CreateDateColumn({type: "timestamp"})
    creation_date: Date;

    @UpdateDateColumn({type: "timestamp"})
    last_update: Date;
}

export default BalanceConstruction;