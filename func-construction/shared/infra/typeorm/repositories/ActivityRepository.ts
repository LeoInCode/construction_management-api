import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { IRequestActivity } from '../../../../createActivity/interfaces/IRequestActivity.interface';
import { InternalServerErrorException } from '../../../exception/internalServerError.exception';
import { NotFoundException } from '../../../exception/notFound.exception';
import { IActivityRepository } from '../../../interfaces/repositories/IActivityRepository';
import { IConstructionRepository } from '../../../interfaces/repositories/IConstructionRepository';
import { IStageRepository } from '../../../interfaces/repositories/IStageRepository';
import Activity from '../entities/Activity';
import Construction from '../entities/Construction';

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

    public async getActivity(id: number, construction: Construction): Promise<Activity> {
        try {
            const activity = await this.ormRepository.findOne({
                id: id,
                construction_id: construction
            });

            if(activity) {
                throw new NotFoundException(
                    "400",
                    "Activity não encontrado",
                    "Activity não encontrado",
                    "ERROR"
                );
            }
    
            return activity;
        } catch (error) {
            if(error.code) {
                throw error;
            }
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Activity"
            );
        }
    }
}

export default ActivityRepository;