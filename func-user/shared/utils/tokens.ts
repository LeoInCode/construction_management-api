import { container } from "tsyringe";
import AllowListRefreshTokenCacheRepository from "../infra/redis/repositories/allowListRefreshTokenCacheRepository";
import BlockListTokenCacheRepository from "../infra/redis/repositories/blockListAccessTokenCacheRepository";
import User from "../infra/typeorm/entities/User";
import authService from "../services/authService";
import TokenService from "../services/tokensService";

const allowlist = new AllowListRefreshTokenCacheRepository();
const blocklist = new BlockListTokenCacheRepository();
const tokenService = new TokenService(allowlist, blocklist);

export default {
    access: {
        name: 'access token',
        expiration: [15, 'm'],
        create(user: User) {
          return tokenService.createTokenJWT(user, this.expiration)
        },
        async verify(token: string) {
          return await tokenService.verifyTokenJWT(token, this.name)
        },
        async invalid(token: string) {
          return await tokenService.invalidTokenJWT(token)
        }
      },
      
      /**
       * Serve para criar um token opaco, para manter o usuário ativo
       */
      refresh: {
        name: 'refresh token',
        expiration: [5, 'd'],
        async create(user: User) {
          return await tokenService.createTokenOpacity(user, this.expiration)
        },
        async verify (token: string) {
          return await tokenService.verifyTokenOpacity(token, this.name)
        },
        async invalid (token: string) {
          return await tokenService.invalidTokenOpacity(token)
        }
    },
}