import 'reflect-metadata';
import { inject, injectable } from "tsyringe";
import { IStageRepository } from "../../shared/interfaces/repositories/IStageRepository";
import { IHandleContent } from '../../shared/interfaces/services/IHandleContent';
import { DataTypeGetUser } from '../../shared/utils/dataTypeGetUser';
import { IRequestStage } from '../interfaces/IRequestStage.interface';

@injectable()
class CreateStageService {

    constructor(
        @inject('StageRepository')
        private stageRepository: IStageRepository,
        @inject('HandleContent')
        private handleContent: IHandleContent
    ) { }

    public async execute(payload: IRequestStage, accessToken: string) {
        try {
            await this.handleContent.getUser(
                accessToken,
                payload.position,
                DataTypeGetUser.stage.entity,
                DataTypeGetUser.action.create
            );

            await this.stageRepository.createStage(payload.stageName, payload.constructionId);
    
            return {
                status: 200,
                data: {
                    message: "success"
                }
            }
        } catch (error) {
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

export default CreateStageService;