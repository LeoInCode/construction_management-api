import { container } from 'tsyringe';

import "../shared/infra/typeorm";

import { IConstructionRepository } from '../shared/interfaces/repositories/IConstructionRepository';
import ConstructionRepository from '../shared/infra/typeorm/repositories/ConstructionRepository';
import { IUserEndpoint } from '../shared/interfaces/endpoints/IGetUserEndpoint';
import UserEndpoint from '../shared/infra/http/endpoints/GetUserEndpoint';
import { IHandleContent } from '../shared/interfaces/services/IHandleContent';
import HandleContent from '../shared/services/handleContent';
import { IStageRepository } from '../shared/interfaces/repositories/IStageRepository';
import StageRepository from '../shared/infra/typeorm/repositories/StageRepository';
import { IActivityRepository } from '../shared/interfaces/repositories/IActivityRepository';
import ActivityRepository from '../shared/infra/typeorm/repositories/ActivityRepository';
import { IInformationActivityRepository } from '../shared/interfaces/repositories/IInformationActivityRepository';
import InformationActivityRepository from '../shared/infra/typeorm/repositories/InformationActivityRepository';

container.registerSingleton<IConstructionRepository>(
  'ConstructionRepository',
  ConstructionRepository
);

container.registerSingleton<IActivityRepository>(
  'ActivityRepository',
  ActivityRepository
);

container.registerSingleton<IInformationActivityRepository>(
  'InformationActivityRepository',
  InformationActivityRepository
);

container.registerSingleton<IStageRepository>(
  'StageRepository',
  StageRepository
);

container.registerSingleton<IUserEndpoint>(
  'UserEndpoint',
  UserEndpoint
);

container.registerSingleton<IHandleContent>(
  'HandleContent',
  HandleContent
);