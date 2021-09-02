import { promisify }      from 'util';
import { InternalServerErrorException } from '../../../exception/internalServerError.exception';
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

  public async get(token: string): Promise<User> {
    try {
      const result = await this.getAsync(this.prefix + token);

      return JSON.parse(result);
    } catch (error) {
      throw new InternalServerErrorException(
        "400",
        error.message,
        "ERROR",
        "Lista de ativos no Cache"
      );
    }
  }

  public async set(token: string, { id, complete_name, email, cpf }: User, dateExpiration: number): Promise<string> {
    try {
      const result = await this.setAsync(this.prefix + token, JSON.stringify({ id, complete_name, email, cpf }))
      this.expireAsync(this.prefix + token, dateExpiration);

      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        "400",
        error.message,
        "ERROR",
        "Lista de ativos no Cache"
      );
    }
  }

  public async del(token: string): Promise<string> {
    try {
      const result = await this.delAsync(this.prefix + token);

      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        "400",
        error.message,
        "ERROR",
        "Lista de ativos no Cache"
      );
    }
  }
}

export default AllowListRefreshTokenCacheRepository;