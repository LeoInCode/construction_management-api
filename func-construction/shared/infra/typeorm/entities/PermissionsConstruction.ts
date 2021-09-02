import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Construction from "./Construction";

@Entity('permissions_construction')
class PermissionsConstruction {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    profile_id: string;

    @Column(​​​​​​​​)
    position: string;

    @CreateDateColumn({type: "timestamp"})
    creation_date: Date;

    @UpdateDateColumn({type: "timestamp"})
    last_update: Date;

    @JoinColumn({
        name: "construction_id", referencedColumnName: "id"
    })
    @ManyToOne(() => Construction, (construction) => construction.permissions)
    construction_id: Construction;
}

export default PermissionsConstruction;