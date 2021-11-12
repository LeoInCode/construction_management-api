import { container } from 'tsyringe';
import "../shared/infra/typeorm";
import GetUserEndpoint from '../shared/infra/http/endpoints/GetUserEndpoint';
import MaterialPriceRepository from '../shared/infra/typeorm/repositories/MaterialPriceRepository';
import StagePriceRepository from '../shared/infra/typeorm/repositories/StagePriceRepository';
import { IGetUserEndpoint } from '../shared/interfaces/endpoints/IGetUserEndpoint';
import { IMaterialPriceRepository } from '../shared/interfaces/repositories/IMaterialPriceRepository';
import { IStagePriceRepository } from '../shared/interfaces/repositories/IStagePriceRepository';
import { IManpowerPriceRepository } from '../shared/interfaces/repositories/IManpowerPriceRepository';
import { IHandleContent } from '../shared/interfaces/services/IHandleContent';
import { IBalanceConstructionRepository } from './../shared/interfaces/repositories/IBalanceConstructionRepository';
import ManpowerPriceRepository from '../shared/infra/typeorm/repositories/ManpowerPriceRepository';
import HandleContent from '../shared/services/handleContent';
import BalanceConstructionRepository from '../shared/infra/typeorm/repositories/BalanceConstructionRepository';

container.registerSingleton<IMaterialPriceRepository>(
  'MaterialPriceRepository',
  MaterialPriceRepository
);

container.registerSingleton<IStagePriceRepository>(
  'StagePriceRepository',
  StagePriceRepository
);

container.registerSingleton<IManpowerPriceRepository>(
  'ManpowerPriceRepository',
  ManpowerPriceRepository
);

container.registerSingleton<IGetUserEndpoint>(
  'GetUserEndpoint',
  GetUserEndpoint
);

container.registerSingleton<IHandleContent>(
  'HandleContent',
  HandleContent
);

container.registerSingleton<IBalanceConstructionRepository>(
  'BalanceConstructionRepository',
  BalanceConstructionRepository
);