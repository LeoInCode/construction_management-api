import { container } from 'tsyringe';
import GetUserEndpoint from '../shared/infra/http/endpoints/GetUserEndpoint';
import "../shared/infra/typeorm";
import MaterialPriceRepository from '../shared/infra/typeorm/repositories/MaterialPriceRepository';
import { IGetUserEndpoint } from '../shared/interfaces/endpoints/IGetUserEndpoint';
import { IMaterialPriceRepository } from '../shared/repositories/IMaterialPriceRepository';

container.registerSingleton<IMaterialPriceRepository>(
  'MaterialPriceRepository',
  MaterialPriceRepository
);

container.registerSingleton<IGetUserEndpoint>(
  'GetUserEndpoint',
  GetUserEndpoint
);