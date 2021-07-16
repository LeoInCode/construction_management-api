import { inject, injectable } from "tsyringe";
import { IActivityRepository } from "../../shared/interfaces/repositories/IActivityRepository";
import { IRequestActivity } from "../interfaces/IRequestActivity.interface";

@injectable()
class CreateActivityService {

    constructor(
        @inject('ActivityRepository')
        private activityRepository: IActivityRepository
    ) {}

    public async execute(payload: IRequestActivity) {
        try {
            await this.activityRepository.createActivity(payload);
    
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

export default CreateActivityService;