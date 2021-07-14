import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { IRequestActivity } from '../../../../createActivity/interfaces/IRequestActivity.interface';
import { InternalServerErrorException } from '../../../exception/internalServerError.exception';
import { IActivityRepository } from '../../../interfaces/repositories/IActivityRepository';
import { IConstructionRepository } from '../../../interfaces/repositories/IConstructionRepository';
import { IStageRepository } from '../../../interfaces/repositories/IStageRepository';
import Activity from '../entities/Activity';
import Stage from '../entities/Stage';

@injectable()
class ActivityRepository implements IActivityRepository {

    private ormRepository: Repository<Activity>;

    constructor(
        @inject('ConstructionRepository')
        private constructionRepository: IConstructionRepository,
        @inject('StageRepository')
        private stageRepository: IStageRepository
    ) {
        this.ormRepository = getRepository(Activity);
    }

    public async createActivity(
        { activityName, constructionId, stageId }: IRequestActivity): Promise<Activity> {
        try {
            const construction = await this.constructionRepository.getConstruction(constructionId);

            const stage = await this.stageRepository.getStage(stageId, construction);

            const activity = this.ormRepository.create({
                construction_id: construction,
                stage_id: stage,
                activity_name: activityName
            });

            return await this.ormRepository.save(activity);
        } catch (error) {
            if (error.code) {
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