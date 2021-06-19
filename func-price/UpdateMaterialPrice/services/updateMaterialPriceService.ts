import { errorMonitor } from "events";
import { inject, injectable } from "tsyringe";
import { IGetUserEndpoint } from "../../shared/interfaces/endpoints/IGetUserEndpoint";
import { IMaterialPrice } from "../../shared/interfaces/IMaterialPrice.interface";
import { IResponseGetUser } from "../../shared/interfaces/IResponseGetUser";
import { IMaterialPriceRepository } from "../../shared/repositories/IMaterialPriceRepository";
import HandleContent from "../../shared/services/handleContent";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";

@injectable()
class UpdateMaterialPriceService {
    
    private handleContent: HandleContent;
    
    constructor(
        @inject('MaterialPriceRepository')
        private materialPriceRepository: IMaterialPriceRepository,
        @inject('GetUserEndpoint')
        private getUserEndpoint: IGetUserEndpoint
    ) { }

    public async execute(body: IMaterialPrice, id: string, accessToken: string) {
        try {            
            this.handleContent = new HandleContent(this.getUserEndpoint);

            await this.handleContent.getUser(accessToken, DataTypeGetUser.entity, DataTypeGetUser.action.create);
            
            await this.materialPriceRepository.updateMaterialPrice(+id, body);
    
            return {
                status: 201,
                data: {
                    message: "success"
                }
            }
        } catch (error) {
            if(error.event) {
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