import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { GeneralErrorException } from "../../shared/exception/generalError.exception";
import { IManpowerPriceRepository } from "../../shared/interfaces/repositories/IManpowerPriceRepository";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";
import { IHandleContent } from "../../shared/interfaces/services/IHandleContent";

@injectable()
class DeleteManpowerPriceService {

    constructor(
        @inject('ManpowerPriceRepository')
        private manpowerPriceRepository: IManpowerPriceRepository,
        @inject('HandleContent')
        private handleContent: IHandleContent,
    ) { }

    public async execute(id: string, position: string, accessToken: string) {
        try {
            await this.handleContent.getUser(accessToken, position, DataTypeGetUser.price.entity, DataTypeGetUser.action.delete);

            const manpowerPrice = await this.manpowerPriceRepository.deleteManpowerPrice(+id);

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