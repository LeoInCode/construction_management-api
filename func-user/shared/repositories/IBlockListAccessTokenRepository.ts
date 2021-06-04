export interface IBlockListAccessTokenCacheRepository {
    get(token: string): Promise<string>;
    set(token: string, dateExpiration: number): Promise<string>;
    del(token: string): Promise<String>;
    containsKey(token: string): Promise<boolean>;
}