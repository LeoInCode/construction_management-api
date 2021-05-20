import { container } from 'tsyringe';
import "../shared/infra/typeorm";
import UserRepository from '../shared/infra/typeorm/repositories/UserRepository';
import IUserRepository from '../shared/repositories/IUserRepository';

container.registerSingleton<IUserRepository>(
    'UserRepository',
    UserRepository,
  );