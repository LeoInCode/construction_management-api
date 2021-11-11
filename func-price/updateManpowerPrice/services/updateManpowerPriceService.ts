import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IManpowerPrice } from "../../shared/interfaces/IManpowerPrice.interface";
import { IManpowerPriceRepository } from "../../shared/interfaces/repositories/IManpowerPriceRepository";
import { IHandleContent } from "../../shared/interfaces/services/IHandleContent";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";

@injectable()
class UpdateManpowerPriceService {

    constructor(
        @inject('ManpowerPriceRepository')
        private manpowerPriceRepository: IManpowerPriceRepository,
        @inject('HandleContent')
        private handleContent: IHandleContent,
    ) { }

    public async execute(body: IManpowerPrice, position: string, id: string, accessToken: string) {
        try {
            await this.handleContent.getUser(accessToken, position, DataTypeGetUser.price.entity, DataTypeGetUser.action.update);

            await this.manpowerPriceRepository.updateManpowerPrice(+id, body);

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

export default UpdateManpowerPriceService;