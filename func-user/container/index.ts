import { container } from 'tsyringe';
import AllowListRefreshTokenCacheRepository from '../shared/infra/redis/repositories/allowListRefreshTokenCacheRepository';
import "../shared/infra/typeorm";
import UserRepository from '../shared/infra/typeorm/repositories/UserRepository';
import { IBlockListAccessTokenCacheRepository } from './../shared/repositories/IBlockListAccessTokenRepository';
import { IAllowListRefreshTokenCacheRepository } from '../shared/repositories/IAllowListCacheRepository';
import IUserRepository from '../shared/repositories/IUserRepository';
import BlockListTokenCacheRepository from '../shared/infra/redis/repositories/blockListAccessTokenCacheRepository';

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository,
);

container.registerSingleton<IAllowListRefreshTokenCacheRepository>(
  'AllowListRefreshTokenCacheRepository',
  AllowListRefreshTokenCacheRepository,
);

container.registerSingleton<IBlockListAccessTokenCacheRepository>(
  'BlockListTokenCacheRepository',
  BlockListTokenCacheRepository,
);