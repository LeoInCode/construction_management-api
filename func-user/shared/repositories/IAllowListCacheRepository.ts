import User from "../infra/typeorm/entities/User";

export interface IAllowListRefreshTokenCacheRepository {
    get(token: string): Promise<User>;
    set(token: string, user: User, dateExpiration: number): Promise<string>;
    del(token: string): Promise<string>;
}