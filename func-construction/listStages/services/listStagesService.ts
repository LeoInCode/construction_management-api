import 'reflect-metadata';
import { inject, injectable } from "tsyringe";
import { IStageRepository } from "../../shared/interfaces/repositories/IStageRepository";

@injectable()
class ListStages {

    constructor(
        @inject('StageRepository')
        private stageRepository: IStageRepository
    ) {}

    public async execute(constructionId: number): Promise<any> {
        try {
            const stages = await this.stageRepository.getAllStages(constructionId);

            const allStages = stages.map(stage => {
                return {
                    id: stage.id,
                    stageName: stage.stage_name,
                    creationDate: stage.creation_date,
                    lastUpdate: stage.last_update,
                    stageItems: stage.activity_items.map(item => {
                        return {
                            activityName: item.activity_name
                        }
                    })
                }
            });

            return {
                status: 200,
                data: allStages
            }
        } catch (error) {
            if (error.event) {
                error = error.event;
            }
            throw {
                status: error.status,
                data: {
                    event: {
                        code: error.code,
                        type: error.eventType,
                        message: error.message,
                        details: error.detail
                    }
                }
            };
        }
    }
}

export default ListStages;