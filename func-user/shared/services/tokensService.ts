import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { IAllowListRefreshTokenCacheRepository } from '../repositories/IAllowListCacheRepository';
import { IBlockListAccessTokenCacheRepository } from '../repositories/IBlockListAccessTokenRepository';
import moment = require('moment');
import User from '../infra/typeorm/entities/User';

class TokenService {

    constructor(
      private allowListRefreshTokenCacheRepository: IAllowListRefreshTokenCacheRepository,
      private blockListTokenCacheRepository: IBlockListAccessTokenCacheRepository
    ) { }

    public createTokenJWT(user: User, [timeQuantity, timeUnity]: any): string {
        const { id, complete_name, email, position }: User = user;
        const token = jwt.sign({ id, complete_name, email, position }, process.env.CHAVE_JWT, {
          expiresIn: timeQuantity + timeUnity
        });
        return token;
    }

    public async verifyTokenJWT(token: string, name: string) {
      try {
        await this.verifyTokenNaBlocklist(token, name);
        const { id, complete_name, email, position }: any = jwt.verify(token, process.env.CHAVE_JWT);
        return { id, complete_name, email, position };
      } catch (error) {
        throw new Error(error);
      }      
    }

    public async verifyTokenNaBlocklist(token: string, name: string): Promise<void> {    
        const tokenHash = this.generateTokenHash(token)

        const tokenNaBlocklist = await this.blockListTokenCacheRepository.containsKey(tokenHash);
        if (tokenNaBlocklist) {
          throw `${name} inválido por logout!`;
        }
    }

    public async invalidTokenJWT(token: string): Promise<string> {
      const dateExpiration: any = jwt.decode(token);
      const tokenHash = this.generateTokenHash(token);
      return await this.blockListTokenCacheRepository.set(tokenHash, dateExpiration.exp);
    }

    public async createTokenOpacity(user: User, [timeQuantity, timeUnity]: any): Promise<string> {
      const tokenOpacity = crypto.randomBytes(24).toString('hex');
      const dateExpiration = moment().add(timeQuantity, timeUnity).unix();      
      await this.allowListRefreshTokenCacheRepository.set(tokenOpacity, user, dateExpiration);
      return tokenOpacity;
    }

    public async verifyTokenOpacity(token: string, name: string): Promise<User> {
      try {
        this.verifyTokenSend(token, name);
        const user = await this.allowListRefreshTokenCacheRepository.get(token);
        this.verifyTokenValid(user, name);
        return user;
      } catch (error) {
        throw new Error(error);
      }
    }

    public async invalidTokenOpacity(token: string): Promise<string> {
      return await this.allowListRefreshTokenCacheRepository.del(token);
    }

    private verifyTokenValid(user: User, name: string): void {
        if (!user) {
          throw `${name} inválido!`;
        }
    }

    private verifyTokenSend(token: string, name: string): void {
        if (!token) {
          throw `${name} não enviado!`;
        }
    }

    private generateTokenHash (token: string): string {
      return crypto.createHash('sha256').update(token).digest('hex');
    }
}

export default TokenService;