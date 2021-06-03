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
        // list: blocklistAccessToken,
        expiration: [15, 'minutes'],
        create(user: User) {
          return tokenService.createTokenJWT(user, this.expiration)
        },
        verify(token: string) {
          return tokenService.verifyTokenJWT(token, this.name)
        },
        invalid(token: string) {
          return tokenService.invalidTokenJWT(token)
        }
      },
      
      /**
       * Serve para criar um token opaco, para manter o usuário ativo
       */
      refresh: {
        name: 'refresh token',
        // list: allowlistRefreshToken,
        expiration: [5, 'days'],
        async create(user: User) {
          return await tokenService.createTokenOpacity(user, this.expiration)
        },
        verify (token: string) {
          return tokenService.verifyTokenOpacity(token, this.name)
        },
        invalid (token: string) {
          return tokenService.invalidTokenOpacity(token)
        }
    },
}