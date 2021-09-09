import 'reflect-metadata';
import { inject, injectable } from "tsyringe";
import { IStageRepository } from "../../shared/interfaces/repositories/IStageRepository";
import { IHandleContent } from '../../shared/interfaces/services/IHandleContent';
import { DataTypeGetUser } from '../../shared/utils/dataTypeGetUser';

@injectable()
class ListStages {

    constructor(
        @inject('StageRepository')
        private stageRepository: IStageRepository,
        @inject('HandleContent')
        private handleContent: IHandleContent
    ) {}

    public async execute(constructionId: number, position: string, accessToken: string): Promise<any> {
        try {
            await this.handleContent.getUser(
                accessToken,
                position,
                DataTypeGetUser.stage.entity,
                DataTypeGetUser.action.read
            );

            const stages = await this.stageRepository.getAllStages(constructionId);

            const allStages = stages.map(stage => {
                return {
                    id: stage.id,
                    stageName: stage.stage_name,
                    creationDate: stage.creation_date,
                    lastUpdate: stage.last_update,
                    items: stage.activity_items.map(item => {
                        return {
                            id: item.id,
                            constructionId: item.construction_id,
                            activityName: item.activity_name,
                            creationDate: item.creation_date,
                            lastUpdate: item.last_update
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