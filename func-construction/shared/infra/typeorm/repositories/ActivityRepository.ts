import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '../../../exception/internalServerError.exception';
import { IActivityRepository } from '../../../interfaces/repositories/IActivityRepository';
import { IConstructionRepository } from '../../../interfaces/repositories/IConstructionRepository';
import Activity from '../entities/Activity';
import Stage from '../entities/Stage';

@injectable()
class ActivityRepository implements IActivityRepository {
    
    private ormRepository: Repository<Stage>;

    constructor(
        @inject('ConstructionRepository')
        private constructionRepository: IConstructionRepository
    ) {
        this.ormRepository = getRepository(Stage);
    }

    public async createActivity(): Promise<Activity> {
        try {
            // const construction = await this.constructionRepository.getConstruction(constructionId);

           
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

export default ActivityRepository;