import 'reflect-metadata';
import { inject, injectable } from "tsyringe";
import { IStageRepository } from "../../shared/interfaces/repositories/IStageRepository";

@injectable()
class CreateStageService {

    constructor(
        @inject('StageRepository')
        private stageRepository: IStageRepository
    ) { }

    public async execute(stageName: string, constructionId: number) {
        try {
            await this.stageRepository.createStage(stageName, constructionId);
    
            return {
                status: 200,
                data: {
                    status: "success"
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