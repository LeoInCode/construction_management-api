import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { GeneralErrorException } from "../../shared/exception/generalError.exception";
import { IMaterialPriceRepository } from "../../shared/interfaces/repositories/IMaterialPriceRepository";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";
import { IHandleContent } from "../../shared/interfaces/services/IHandleContent";

@injectable()
class DeleteMaterialPriceService {
    
    constructor(
        @inject('MaterialPriceRepository')
        private materialPriceRepository: IMaterialPriceRepository,
        @inject('HandleContent')
        private handleContent: IHandleContent,
    ) { }

    public async execute(id: string, accessToken: string) {
        try {
            await this.handleContent.getUser(accessToken, DataTypeGetUser.entity, DataTypeGetUser.action.delete);

            const materialPrice = await this.materialPriceRepository.deleteMaterialPrice(+id);

            if(materialPrice != 1) {
                throw new GeneralErrorException(
                    "400",
                    "Erro ao remover material",
                    "Erro ao remover material",
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

export default DeleteMaterialPriceService;