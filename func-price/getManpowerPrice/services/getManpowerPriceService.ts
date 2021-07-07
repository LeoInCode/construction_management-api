import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import ManpowerPrice from "../../shared/infra/typeorm/entities/ManpowerPrice";
import { IManpowerPrice } from "../../shared/interfaces/IManpowerPrice.interface";
import { IManpowerPriceRepository } from "../../shared/interfaces/repositories/IManpowerPriceRepository";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";
import { IHandleContent } from "../../shared/interfaces/services/IHandleContent";

@injectable()
class GetManpowerPriceService {
    
    constructor(
        @inject('ManpowerPriceRepository')
        private manpowerPriceRepository: IManpowerPriceRepository,
        @inject('HandleContent')
        private handleContent: IHandleContent,
    ) { }

    public async execute(id: string, accessToken: string) {
        try {
            await this.handleContent.getUser(accessToken, DataTypeGetUser.entity, DataTypeGetUser.action.read);

            const manpowerPrice: ManpowerPrice = await this.manpowerPriceRepository.getManpowerPrice(+id);

            const manpowerPriceFiltered: IManpowerPrice = {
                constructionId: +manpowerPrice.construction_id,
                occupation: manpowerPrice.occupation,
                service: manpowerPrice.service,
                amount: +manpowerPrice.amount,
                creationDate: manpowerPrice.creation_date,
                lastUpdate: manpowerPrice.last_update
            };

            return {
                status: 200,
                data: manpowerPriceFiltered
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

export default GetManpowerPriceService;