import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IManpowerPrice } from "../../shared/interfaces/IManpowerPrice.interface";
import { IManpowerPriceRepository } from "../../shared/interfaces/repositories/IManpowerPriceRepository";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";
import ManpowerPrice from "../../shared/infra/typeorm/entities/ManpowerPrice";
import { IHandleContent } from "../../shared/interfaces/services/IHandleContent";

@injectable()
class ListManpowerPriceService {
    
    constructor(
        @inject('ManpowerPriceRepository')
        private manpowerPriceRepository: IManpowerPriceRepository,
        @inject('HandleContent')
        private handleContent: IHandleContent,
    ) { }

    public async execute(constructionId: string, accessToken: string) {
        try {
            await this.handleContent.getUser(accessToken, DataTypeGetUser.entity, DataTypeGetUser.action.read);

            const manpowerPrice: ManpowerPrice[] = await this.manpowerPriceRepository.listManpowerPrice(+constructionId);

            const manpowerPriceFiltered: IManpowerPrice[] = manpowerPrice.map((manpowerPrice: ManpowerPrice) => {
                return {
                    id: manpowerPrice.id,
                    constructionId: +manpowerPrice.construction_id,
                    occupation: manpowerPrice.occupation,
                    service: manpowerPrice.service,
                    amount: +manpowerPrice.amount,
                    creationDate: manpowerPrice.creation_date,
                    lastUpdate: manpowerPrice.last_update
                }
            });

            return {
                status: 200,
                data: {
                    items: manpowerPriceFiltered
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

export default ListManpowerPriceService;