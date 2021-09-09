import { inject, injectable } from "tsyringe";
import { IInformationActivityRepository } from "../../shared/interfaces/repositories/IInformationActivityRepository";
import { IHandleContent } from "../../shared/interfaces/services/IHandleContent";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";
import { IRequestInformationActivity } from "../interfaces/IRequestInformationActivity.interface";

@injectable()
class CreateInformationActivityService {

    constructor(
        @inject('InformationActivityRepository')
        private informationActivityRepository: IInformationActivityRepository,
        @inject('HandleContent')
        private handleContent: IHandleContent
    ) {}

    public async execute(payload: IRequestInformationActivity, accessToken: string): Promise<any> {
        try {
            await this.handleContent.getUser(
                accessToken,
                payload.position,
                DataTypeGetUser.information.entity,
                DataTypeGetUser.action.create
            );

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