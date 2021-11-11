import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IStagePrice } from "../../shared/interfaces/IStagePrice.interface";
import { IStagePriceRepository } from "../../shared/interfaces/repositories/IStagePriceRepository";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";
import StagePrice from "../../shared/infra/typeorm/entities/StagePrice";
import { IHandleContent } from "../../shared/interfaces/services/IHandleContent";

@injectable()
class ListStagePriceService {
    
    constructor(
        @inject('StagePriceRepository')
        private stagePriceRepository: IStagePriceRepository,
        @inject('HandleContent')
        private handleContent: IHandleContent,
    ) { }

    public async execute(constructionId: string, position: string, accessToken: string) {
        try {
            await this.handleContent.getUser(accessToken, position, DataTypeGetUser.price.entity, DataTypeGetUser.action.read);

            const stagePrice: StagePrice[] = await this.stagePriceRepository.listStagePrice(+constructionId);

            const stagePriceFiltered: IStagePrice[] = stagePrice.map((stagePrice: StagePrice) => {
                return {
                    id: stagePrice.id,
                    constructionId: +stagePrice.construction_id,
                    stage: stagePrice.stage,
                    description: stagePrice.description,
                    amount: +stagePrice.amount,
                    creationDate: stagePrice.creation_date,
                    lastUpdate: stagePrice.last_update
                }
            });

            return {
                status: 200,
                data: {
                    items: stagePriceFiltered
                }
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

export default ListStagePriceService;