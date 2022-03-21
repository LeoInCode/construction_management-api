import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { inject, injectable } from "tsyringe";
import { IInformationActivityRepository } from "../../shared/interfaces/repositories/IInformationActivityRepository";
import { IHandleContent } from "../../shared/interfaces/services/IHandleContent";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";
import { IActivityResponseInformation, IDescriptionResponseInformation } from "../interfaces/IResponseInformationActivity.interface";

@injectable()
class ListInformationActivityService {

    constructor(
        @inject('InformationActivityRepository')
        private informationActivityRepository: IInformationActivityRepository,
        @inject('HandleContent')
        private handleContent: IHandleContent
    ) {}

    public async execute(id: number, position: string, accessToken: string): Promise<any> {
        try {
            const user = await this.handleContent.getUser(
                accessToken,
                position,
                DataTypeGetUser.information.entity,
                DataTypeGetUser.action.read
            );

            const informationActivity =  await this.informationActivityRepository.getInformationActivity(id);

            const description: IDescriptionResponseInformation = {
                id: informationActivity.id,
                responsible: informationActivity.responsible,
                creationDate: format(new Date(informationActivity.creation_date.toString()), 'dd/MM/yyyy', { locale: ptBR }),
                deadline: format(new Date(informationActivity.deadline.toString()), 'dd/MM/yyyy', { locale: ptBR }),
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
                    activity,
                    permission: user.permission
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