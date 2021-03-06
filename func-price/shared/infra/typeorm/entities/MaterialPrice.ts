import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('material_price')
class MaterialPrice {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    construction_id: number;

    @Column()
    display_name: string;  

    @Column(​​​​​​​​{​​​​​​​​ nullable: false, type: 'decimal', precision: 12, scale: 4 })
    unit_price: number;

    @Column()
    quantity: number;

    @CreateDateColumn({type: "timestamp"})
    creation_date: Date;

    @UpdateDateColumn({type: "timestamp"})
    last_update: Date;
}

export default MaterialPrice;