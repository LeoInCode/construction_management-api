import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IStagePrice } from "../../shared/interfaces/IStagePrice.interface";
import { IStagePriceRepository } from "../../shared/interfaces/repositories/IStagePriceRepository";
import { IHandleContent } from "../../shared/interfaces/services/IHandleContent";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";

@injectable()
class UpdateStagePriceService {

    constructor(
        @inject('StagePriceRepository')
        private stagePriceRepository: IStagePriceRepository,
        @inject('HandleContent')
        private handleContent: IHandleContent,
    ) { }

    public async execute(body: IStagePrice, id: string, position: string, accessToken: string) {
        try {
            await this.handleContent.getUser(accessToken, position, DataTypeGetUser.price.entity, DataTypeGetUser.action.update);

            await this.stagePriceRepository.updateStagePrice(+id, body);

            return {
                status: 200,
                data: {
                    message: "success"
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

export default UpdateStagePriceService;