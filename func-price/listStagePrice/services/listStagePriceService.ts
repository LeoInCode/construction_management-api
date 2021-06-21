import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IGetUserEndpoint } from "../../shared/interfaces/endpoints/IGetUserEndpoint";
import { IStagePrice } from "../../shared/interfaces/IStagePrice.interface";
import { IStagePriceRepository } from "../../shared/interfaces/repositories/IStagePriceRepository";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";
import StagePrice from "../../shared/infra/typeorm/entities/StagePrice";
import HandleContent from "../../shared/services/handleContent";

@injectable()
class ListStagePriceService {
    
    private handleContent: HandleContent;

    constructor(
        @inject('StagePriceRepository')
        private stagePriceRepository: IStagePriceRepository,
        @inject('GetUserEndpoint')
        private getUserEndpoint: IGetUserEndpoint
    ) { }

    public async execute(constructionId: string, accessToken: string) {
        try {
            this.handleContent = new HandleContent(this.getUserEndpoint);

            await this.handleContent.getUser(accessToken, DataTypeGetUser.entity, DataTypeGetUser.action.read);

            const stagePrice: StagePrice[] = await this.stagePriceRepository.listStagePrice(+constructionId);

            const stagePriceFiltered: IStagePrice[] = stagePrice.map((stagePrice: StagePrice) => {
                return {
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