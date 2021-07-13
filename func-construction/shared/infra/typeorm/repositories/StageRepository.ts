import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { IRequestConstruction } from '../../../../createConstruction/interfaces/IRequestConstruction.interface';
import { InternalServerErrorException } from '../../../exception/internalServerError.exception';
import { IStageRepository } from '../../../interfaces/repositories/IStageRepository';
import IUserRepository from '../../../interfaces/repositories/IUserRepository';
import Construction from '../entities/Construction';
import Stage from '../entities/Stage';

@injectable()
class StageRepository implements IStageRepository {
    
    private ormRepository: Repository<Stage>;

    constructor() {
        this.ormRepository = getRepository(Stage);
    }

    public async createStage(): Promise<Construction> {
        try {
          
            return;
        } catch (error) {
            if(error.code) {
                throw error;
            }
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Stage"
            );
        }
    }
    
}

export default StageRepository;