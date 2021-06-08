import User from "../infra/typeorm/entities/User";

export interface IAllowListRefreshTokenCacheRepository {
    get(token: string): Promise<User>;
    set(token: string, { id, complete_name, email, position }: User, dateExpiration: number): Promise<string>;
    del(token: string): Promise<string>;
}