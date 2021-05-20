import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_config')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    complete_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    email_verify: boolean;

    @Column()
    position: string;
}

export default User;