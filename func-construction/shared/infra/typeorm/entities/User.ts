import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Construction from "./Construction";

@Entity('user_config')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    complete_name: string;

    @PrimaryColumn()
    email: string;

    @Column()
    password: string;

    @Column()
    email_verify: boolean;

    @Column({ type: "enum", enum: ["client", "employee", "admin"], default: "client" })
    position: string;

    @OneToMany(() => Construction, construction => construction.user_id)
    construction_items: Construction[];
}

export default User;