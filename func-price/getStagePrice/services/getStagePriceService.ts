import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import StagePrice from "../../shared/infra/typeorm/entities/StagePrice";
import { IStagePrice } from "../../shared/interfaces/IStagePrice.interface";
import { IStagePriceRepository } from "../../shared/interfaces/repositories/IStagePriceRepository";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";
import { IHandleContent } from "../../shared/interfaces/services/IHandleContent";

@injectable()
class GetStagePriceService {
    
    constructor(
        @inject('StagePriceRepository')
        private stagePriceRepository: IStagePriceRepository,
        @inject('HandleContent')
        private handleContent: IHandleContent,
    ) { }

    public async execute(id: string, position: string, accessToken: string) {
        try {
            await this.handleContent.getUser(accessToken, position, DataTypeGetUser.price.entity, DataTypeGetUser.action.read);

            const stagePrice: StagePrice = await this.stagePriceRepository.getStagePrice(+id);

            const stagePriceFiltered: IStagePrice = {
                constructionId: +stagePrice.construction_id,
                stage: stagePrice.stage,
                description: stagePrice.description,
                amount: +stagePrice.amount,
                creationDate: stagePrice.creation_date,
                lastUpdate: stagePrice.last_update
            };

            return {
                status: 200,
                data: stagePriceFiltered
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

export default GetStagePriceService;