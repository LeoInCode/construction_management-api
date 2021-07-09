import { container } from 'tsyringe';

import "../shared/infra/typeorm";

import { IConstructionRepository } from '../shared/interfaces/repositories/IConstructionRepository';
import ConstructionRepository from '../shared/infra/typeorm/repositories/ConstructionRepository';
import IUserRepository from '../shared/interfaces/repositories/IUserRepository';
import UserRepository from '../shared/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IConstructionRepository>(
  'ConstructionRepository',
  ConstructionRepository
);

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository,
);