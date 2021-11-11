import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IMaterialPrice } from "../../shared/interfaces/IMaterialPrice.interface";
import { IMaterialPriceRepository } from "../../shared/interfaces/repositories/IMaterialPriceRepository";
import { IHandleContent } from "../../shared/interfaces/services/IHandleContent";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";

@injectable()
class UpdateMaterialPriceService {

    constructor(
        @inject('MaterialPriceRepository')
        private materialPriceRepository: IMaterialPriceRepository,
        @inject('HandleContent')
        private handleContent: IHandleContent,
    ) { }

    public async execute(body: IMaterialPrice, id: string, position: string, accessToken: string) {
        try {
            await this.handleContent.getUser(accessToken, position, DataTypeGetUser.price.entity, DataTypeGetUser.action.update);

            await this.materialPriceRepository.updateMaterialPrice(+id, body);

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

export default UpdateMaterialPriceService;