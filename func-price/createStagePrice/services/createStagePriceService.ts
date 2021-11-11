import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IStagePrice } from "../../shared/interfaces/IStagePrice.interface";
import { IStagePriceRepository } from "../../shared/interfaces/repositories/IStagePriceRepository";
import { IHandleContent } from "../../shared/interfaces/services/IHandleContent";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";

@injectable()
class CreateStagePriceService {
        
    constructor(
        @inject('StagePriceRepository')
        private stagePriceRepository: IStagePriceRepository, 
        @inject('HandleContent')
        private handleContent: IHandleContent,
    ) { }

    public async execute(body: IStagePrice, accessToken: string) {
        try {
            await this.handleContent.getUser(accessToken, body.position, DataTypeGetUser.price.entity, DataTypeGetUser.action.create);
            
            await this.stagePriceRepository.createStagePrice(body);
    
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

export default CreateStagePriceService;