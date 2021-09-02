import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
    cpf: string;

    @Column()
    email_verify: boolean;
}

export default User;