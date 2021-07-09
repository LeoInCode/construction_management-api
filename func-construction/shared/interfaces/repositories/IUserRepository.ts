import User from "../../infra/typeorm/entities/User";

export default interface IUserRepository {
    getUser(id: number): Promise<User>;
}
