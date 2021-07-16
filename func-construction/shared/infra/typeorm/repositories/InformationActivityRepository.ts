import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { IRequestInformationActivity } from '../../../../createInformationActivity/interfaces/IRequestInformationActivity.interface';
import { InternalServerErrorException } from '../../../exception/internalServerError.exception';
import { IActivityRepository } from '../../../interfaces/repositories/IActivityRepository';
import { IConstructionRepository } from '../../../interfaces/repositories/IConstructionRepository';
import { IInformationActivityRepository } from '../../../interfaces/repositories/IInformationActivityRepository';
import InformationActivity from '../entities/InformationActivity';

@injectable()
class InformationActivityRepository implements IInformationActivityRepository {

    private ormRepository: Repository<InformationActivity>;

    constructor(
        @inject('ConstructionRepository')
        private constructionRepository: IConstructionRepository,
        @inject('ActivityRepository')
        private activityRepository: IActivityRepository
    ) {
        this.ormRepository = getRepository(InformationActivity);
    }

    public async createInformationActivity(
        { activityId,
            constructionId,
            responsible,
            deadline,
            description,
            description_img,
            progress,
            result,
            result_img}: IRequestInformationActivity): Promise<InformationActivity> {
        try {
            const construction = await this.constructionRepository.getConstruction(constructionId);

            const activity = await this.activityRepository.getActivity(activityId, construction);
            
            const informationActivity = this.ormRepository.create({
                construction_id: construction,
                activity: activity,
                responsible: responsible,
                deadline: deadline || new Date(),
                description: description,
                description_img: description_img,
                progress: progress || 0,
                result: result,
                result_img: result_img
            });

            return await this.ormRepository.save(informationActivity);
        } catch (error) {
            if (error.code) {
                throw error;
            }
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "InformationActivity"
            );
        }
    }

}

export default InformationActivityRepository;