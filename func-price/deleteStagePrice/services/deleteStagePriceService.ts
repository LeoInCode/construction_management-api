import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { GeneralErrorException } from "../../shared/exception/generalError.exception";
import { IGetUserEndpoint } from "../../shared/interfaces/endpoints/IGetUserEndpoint";
import { IStagePriceRepository } from "../../shared/interfaces/repositories/IStagePriceRepository";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";
import HandleContent from "../../shared/services/handleContent";

@injectable()
class DeleteStagePriceService {
    
    private handleContent: HandleContent;

    constructor(
        @inject('StagePriceRepository')
        private stagePriceRepository: IStagePriceRepository,
        @inject('GetUserEndpoint')
        private getUserEndpoint: IGetUserEndpoint
    ) { }

    public async execute(id: string, accessToken: string) {
        try {
            this.handleContent = new HandleContent(this.getUserEndpoint);

            await this.handleContent.getUser(accessToken, DataTypeGetUser.entity, DataTypeGetUser.action.delete);

            const stagePrice = await this.stagePriceRepository.deleteStagePrice(+id);

            if(stagePrice != 1) {
                throw new GeneralErrorException(
                    "400",
                    "Erro ao remover Stage",
                    "Erro ao remover Stage",
                    "ERROR",
                    400
                );
            }

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

export default DeleteStagePriceService;