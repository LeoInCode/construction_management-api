import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('material_price')
class MaterialPrice {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @PrimaryColumn()
    construction_id: string;

    @Column()
    display_name: string;  

    @Column(​​​​​​​​{​​​​​​​​ nullable: false, type: 'decimal', precision: 12, scale: 4 })
    unit_price: number;

    @Column()
    quantity: number;

    @Column({type: "timestamp"})
    creation_date: Date;

    @Column({type: "timestamp"})
    last_update: Date;
}

export default MaterialPrice;