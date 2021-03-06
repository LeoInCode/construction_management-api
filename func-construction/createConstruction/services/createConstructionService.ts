import 'reflect-metadata';
import { inject, injectable } from "tsyringe";
import { IConstructionRepository } from "../../shared/interfaces/repositories/IConstructionRepository";
import { IHandleContent } from '../../shared/interfaces/services/IHandleContent';
import { IRequestConstruction } from "../interfaces/IRequestConstruction.interface";
import '../../container';
import { IPermissionsConstructionRepository } from '../../shared/interfaces/repositories/IPermissionsConstructionRepository';
@injectable()
class CreateConstructionService {

    constructor(
        @inject('ConstructionRepository')
        private constructionRepository: IConstructionRepository,
        @inject('PermissionsConstructionRepository')
        private permissionsConstructionRepository: IPermissionsConstructionRepository,
    ) { }

    public async execute(payload: IRequestConstruction) {
        try {
            const construction = await this.constructionRepository.createConstruction(payload);
                
            await this.permissionsConstructionRepository.createPermissionsConstruction(construction, payload.position)

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

export default CreateConstructionService;