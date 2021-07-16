import { inject, injectable } from "tsyringe";
import { IInformationActivityRepository } from "../../shared/interfaces/repositories/IInformationActivityRepository";
import { IActivityResponseInformation, IDescriptionResponseInformation } from "../interfaces/IResponseInformationActivity.interface";

@injectable()
class ListInformationActivityService {

    constructor(
        @inject('InformationActivityRepository')
        private informationActivityRepository: IInformationActivityRepository
    ) {}

    public async execute(id: number): Promise<any> {
        try {
            const informationActivity =  await this.informationActivityRepository.getInformationActivity(id);

            const description: IDescriptionResponseInformation = {
                id: informationActivity.id,
                responsible: informationActivity.responsible,
                creationDate: informationActivity.creation_date,
                deadline: informationActivity.deadline,
                description: informationActivity.description,
                description_img: informationActivity.description_img
            };

            const activity: IActivityResponseInformation = {
                id: informationActivity.id,
                progress: +informationActivity.progress,
                result: informationActivity.result,
                result_img: informationActivity.result_img
            };

            return {
                status: 200,
                data: {
                    description,
                    activity
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

export default ListInformationActivityService;