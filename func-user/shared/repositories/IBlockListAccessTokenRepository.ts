export interface IBlockListAccessTokenCacheRepository {
    get(token: string): Promise<string>;
    set(token: string, dateExpiration): Promise<string>;
    del(token: string): Promise<String>;
    containsKey(token: string): Promise<boolean>;
}