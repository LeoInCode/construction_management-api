import { inject, injectable } from "tsyringe";
import { IInformationActivityRepository } from "../../shared/interfaces/repositories/IInformationActivityRepository";
import { IRequestInformationActivity } from "../interfaces/IRequestInformationActivity.interface";

@injectable()
class CreateInformationActivityService {

    constructor(
        @inject('InformationActivityRepository')
        private informationActivityRepository: IInformationActivityRepository
    ) {}

    public async execute(payload: IRequestInformationActivity): Promise<any> {
        try {
            await this.informationActivityRepository.createInformationActivity(payload);
    
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

export default CreateInformationActivityService;