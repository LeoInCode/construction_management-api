import { IPayload } from "../../putUser/interfaces/IPayload.interface";
import User from "../infra/typeorm/entities/User";
import { IUser } from "../interfaces/IUser.interface";

export default interface IUserRepository {
    createUser({ completeName, email }: IUser, passwordHash: string): Promise<User>;
    updateUser(id: number, user: IPayload): Promise<User>;
    getUser(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
}