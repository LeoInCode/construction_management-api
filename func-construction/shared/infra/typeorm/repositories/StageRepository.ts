import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '../../../exception/internalServerError.exception';
import { IConstructionRepository } from '../../../interfaces/repositories/IConstructionRepository';
import { IStageRepository } from '../../../interfaces/repositories/IStageRepository';
import Construction from '../entities/Construction';
import Stage from '../entities/Stage';

@injectable()
class StageRepository implements IStageRepository {
    
    private ormRepository: Repository<Stage>;

    constructor(
        @inject('ConstructionRepository')
        private constructionRepository: IConstructionRepository
    ) {
        this.ormRepository = getRepository(Stage);
    }

    public async createStage(stageName: string, constructionId: number): Promise<Stage> {
        try {
            const construction = await this.constructionRepository.getConstruction(constructionId);

            const stage = this.ormRepository.create({
                construction_id: construction,
                stage_name: stageName
            });

            return await this.ormRepository.save(stage);
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