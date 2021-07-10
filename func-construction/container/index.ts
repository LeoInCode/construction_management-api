import { container } from 'tsyringe';

import "../shared/infra/typeorm";

import { IConstructionRepository } from '../shared/interfaces/repositories/IConstructionRepository';
import ConstructionRepository from '../shared/infra/typeorm/repositories/ConstructionRepository';
import IUserRepository from '../shared/interfaces/repositories/IUserRepository';
import UserRepository from '../shared/infra/typeorm/repositories/UserRepository';
import { IUserEndpoint } from '../shared/interfaces/endpoints/IGetUserEndpoint';
import UserEndpoint from '../shared/infra/http/endpoints/GetUserEndpoint';
import { IHandleContent } from '../shared/interfaces/services/IHandleContent';
import HandleContent from '../shared/services/handleContent';

container.registerSingleton<IConstructionRepository>(
  'ConstructionRepository',
  ConstructionRepository
);

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository,
);

container.registerSingleton<IUserEndpoint>(
  'UserEndpoint',
  UserEndpoint
);

container.registerSingleton<IHandleContent>(
  'HandleContent',
  HandleContent
);