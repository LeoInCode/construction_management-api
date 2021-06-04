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
        const token = jwt.sign({ id, complete_name, email }, process.env.CHAVE_JWT, {
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

    public async verifyTokenNaBlocklist(token: string, name: string) {    
        const tokenHash = this.generateTokenHash(token)

        const tokenNaBlocklist = await this.blockListTokenCacheRepository.containsKey(tokenHash);
        if (tokenNaBlocklist) {
          throw `${name} inválido por logout!`;
        }
    }

    public invalidTokenJWT(token: string) {
      const dateExpiration = jwt.decode(token);
      const tokenHash = this.generateTokenHash(token);
      return this.blockListTokenCacheRepository.set(tokenHash, dateExpiration);
    }

    public async createTokenOpacity(user: User, [timeQuantity, timeUnity]: any) {
      const tokenOpacity = crypto.randomBytes(24).toString('hex');
      const dateExpiration = moment().add(timeQuantity, timeUnity).unix();      
      await this.allowListRefreshTokenCacheRepository.set(tokenOpacity, user, dateExpiration);
      return tokenOpacity;
    }

    public async verifyTokenOpacity(token: string, name: string) {
        this.verifyTokenSend(token, name);
        const id = await this.allowListRefreshTokenCacheRepository.get(token);
        this.verifyTokenValid(id, name);
        return id;
    }

    public async invalidTokenOpacity(token: string) {
        await this.allowListRefreshTokenCacheRepository.del(token);
    }

    private verifyTokenValid(id: string, name: string) {
        if (!id) {
          throw `${name} inválido!`;
        }
    }

    private verifyTokenSend(token: string, name: string) {
        if (!token) {
          throw new Error(`${name} não enviado!`);
        }
    }

    private generateTokenHash (token: string) {
      return crypto.createHash('sha256').update(token).digest('hex');
    }
}

export default TokenService;