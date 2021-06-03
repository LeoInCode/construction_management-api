import { promisify }      from 'util';
import { IAllowListRefreshTokenCacheRepository } from '../../../repositories/IAllowListCacheRepository';
import User from '../../typeorm/entities/User';
import client             from '../config/connection';

class AllowListRefreshTokenCacheRepository implements IAllowListRefreshTokenCacheRepository{

  constructor() { }

  public setAsync = promisify(client.set).bind(client);
  public getAsync = promisify(client.get).bind(client);
  public delAsync = promisify(client.del).bind(client);
  public expireAsync = promisify(client.expireat).bind(client);

  private prefix: string = 'allowlist:';

  public async get(token: string): Promise<string> {
    try {
      const result = await this.getAsync(this.prefix + token);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async set(token: string, { id, complete_name, email }: User, dateExpiration): Promise<string> {
    try {
      const result = await this.setAsync(this.prefix + token, JSON.stringify({ id, complete_name, email }))
      this.expireAsync(this.prefix + token, dateExpiration);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async del(token: string): Promise<String> {
    try {
      const result = await this.delAsync(this.prefix + token);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AllowListRefreshTokenCacheRepository;