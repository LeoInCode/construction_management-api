import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import MaterialPrice from "../../shared/infra/typeorm/entities/MaterialPrice";
import { IGetUserEndpoint } from "../../shared/interfaces/endpoints/IGetUserEndpoint";
import { IMaterialPrice } from "../../shared/interfaces/IMaterialPrice.interface";
import { IMaterialPriceRepository } from "../../shared/interfaces/repositories/IMaterialPriceRepository";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";
import HandleContent from "../../shared/services/handleContent";

@injectable()
class GetMaterialPriceService {
    
    private handleContent: HandleContent;

    constructor(
        @inject('MaterialPriceRepository')
        private materialPriceRepository: IMaterialPriceRepository,
        @inject('GetUserEndpoint')
        private getUserEndpoint: IGetUserEndpoint
    ) { }

    public async execute(id: string, accessToken: string) {
        try {
            this.handleContent = new HandleContent(this.getUserEndpoint);

            await this.handleContent.getUser(accessToken, DataTypeGetUser.entity, DataTypeGetUser.action.read);

            const materialPrice: MaterialPrice = await this.materialPriceRepository.getMaterialPrice(+id);

            const materialPriceFiltered: IMaterialPrice = {
                constructionId: +materialPrice.construction_id,
                displayName: materialPrice.display_name,
                unitPrice: +materialPrice.unit_price,
                quantity: +materialPrice.quantity,
                creationDate: materialPrice.creation_date,
                lastUpdate: materialPrice.last_update
            };

            return {
                status: 200,
                data: materialPriceFiltered
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

export default GetMaterialPriceService;