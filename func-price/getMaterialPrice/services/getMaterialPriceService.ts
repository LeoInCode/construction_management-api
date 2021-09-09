import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import MaterialPrice from "../../shared/infra/typeorm/entities/MaterialPrice";
import { IMaterialPrice } from "../../shared/interfaces/IMaterialPrice.interface";
import { IMaterialPriceRepository } from "../../shared/interfaces/repositories/IMaterialPriceRepository";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";
import { IHandleContent } from "../../shared/interfaces/services/IHandleContent";

@injectable()
class GetMaterialPriceService {
    
    constructor(
        @inject('MaterialPriceRepository')
        private materialPriceRepository: IMaterialPriceRepository,
        @inject('HandleContent')
        private handleContent: IHandleContent,
    ) { }

    public async execute(id: string, position: string, accessToken: string) {
        try {
            await this.handleContent.getUser(accessToken, position, DataTypeGetUser.entity, DataTypeGetUser.action.read);

            const materialPrice: MaterialPrice = await this.materialPriceRepository.getMaterialPrice(+id);

            const materialPriceFiltered: IMaterialPrice = {
                constructionId: +materialPrice.construction_id,
                displayName: materialPrice.display_name,
                unitPrice: +materialPrice.unit_price,
                quantity: +materialPrice.quantity,
                totalBalance: +materialPrice.unit_price * +materialPrice.quantity,
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