import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { GeneralErrorException } from "../../shared/exception/generalError.exception";
import { IGetUserEndpoint } from "../../shared/interfaces/endpoints/IGetUserEndpoint";
import { IManpowerPriceRepository } from "../../shared/interfaces/repositories/IManpowerPriceRepository";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";
import HandleContent from "../../shared/services/handleContent";

@injectable()
class DeleteManpowerPriceService {

    private handleContent: HandleContent;

    constructor(
        @inject('ManpowerPriceRepository')
        private ManpowerPriceRepository: IManpowerPriceRepository,
        @inject('GetUserEndpoint')
        private getUserEndpoint: IGetUserEndpoint
    ) { }

    public async execute(id: string, accessToken: string) {
        try {
            this.handleContent = new HandleContent(this.getUserEndpoint);

            await this.handleContent.getUser(accessToken, DataTypeGetUser.entity, DataTypeGetUser.action.delete);

            const manpowerPrice = await this.ManpowerPriceRepository.deleteManpowerPrice(+id);

            if (manpowerPrice != 1) {
                throw new GeneralErrorException(
                    "400",
                    "Erro ao remover Manpower",
                    "Erro ao remover Manpower",
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

export default DeleteManpowerPriceService;