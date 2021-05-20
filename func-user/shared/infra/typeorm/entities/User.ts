import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    position: string;
}

export default User;