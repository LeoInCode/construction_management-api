import User from "../infra/typeorm/entities/User";
import { IUser } from "../interfaces/IUser.interface";

export default interface IUserRepository {
    createUser({ completeName, email, password }: IUser): Promise<User>;
    updateUser(id: number, { completeName, password, position }: IUser): Promise<User>;
    getUser(id: number): Promise<User>;
}