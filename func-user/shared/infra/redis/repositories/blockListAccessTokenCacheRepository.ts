import { promisify }      from 'util';
import { IBlockListAccessTokenCacheRepository } from '../../../repositories/IBlockListAccessTokenRepository';
import client             from '../config/connection';

class BlockListTokenCacheRepository implements IBlockListAccessTokenCacheRepository{

  constructor() { }

  private setAsync = promisify(client.set).bind(client);
  private getAsync = promisify(client.get).bind(client);
  private delAsync = promisify(client.del).bind(client);
  private expireAsync = promisify(client.expireat).bind(client);
  private existsAsync = promisify(client.exists).bind(client);


  private prefix: string = 'blocklist:';

  public async get(token: string): Promise<string> {
    try {
      const result = await this.getAsync(this.prefix + token);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async containsKey(token: string): Promise<boolean> {
      try {
        const result = await this.existsAsync(this.prefix + token);

        return result === 1;
      } catch (error) {
          
      }
  }

  public async set(token: string, dateExpiration: number): Promise<string> {
    try {
      const result = await this.setAsync(this.prefix + token, '');

      this.expireAsync(this.prefix + token, dateExpiration);

      return result;
    } catch (error) {
      console.log(error);
      
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


export default BlockListTokenCacheRepository;