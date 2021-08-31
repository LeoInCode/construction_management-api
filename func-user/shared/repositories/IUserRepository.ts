import User from "../infra/typeorm/entities/User";
import { IUser } from "../interfaces/IUser.interface";

export default interface IUserRepository {
    createUser({ completeName, email }: IUser, passwordHash: string): Promise<User>;
    updateUser(id: number, { completeName, password }: IUser): Promise<User>;
    getUser(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
}