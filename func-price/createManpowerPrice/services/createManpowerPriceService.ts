import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IGetUserEndpoint } from "../../shared/interfaces/endpoints/IGetUserEndpoint";
import { IManpowerPrice } from "../../shared/interfaces/IManpowerPrice.interface";
import { IManpowerPriceRepository } from "../../shared/interfaces/repositories/IManpowerPriceRepository";
import HandleContent from "../../shared/services/handleContent";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";

@injectable()
class CreateManpowerPriceService {
    
    private handleContent: HandleContent;
    
    constructor(
        @inject('ManpowerPriceRepository')
        private manpowerPriceRepository: IManpowerPriceRepository,
        @inject('GetUserEndpoint')
        private getUserEndpoint: IGetUserEndpoint
    ) { }

    public async execute(body: IManpowerPrice, accessToken: string) {
        try {            
            this.handleContent = new HandleContent(this.getUserEndpoint);

            await this.handleContent.getUser(accessToken, DataTypeGetUser.entity, DataTypeGetUser.action.create);
            
            await this.manpowerPriceRepository.createManpowerPrice(body);
    
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

export default CreateManpowerPriceService;