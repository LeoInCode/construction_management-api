import 'reflect-metadata';
import { inject, injectable } from "tsyringe";
import { IConstructionRepository } from "../../shared/interfaces/repositories/IConstructionRepository";
import { IHandleContent } from '../../shared/interfaces/services/IHandleContent';
import { IRequestConstruction } from "../interfaces/IRequestConstruction.interface";
import '../../container';
@injectable()
class CreateConstructionService {

    constructor(
        @inject('ConstructionRepository')
        private constructionRepository: IConstructionRepository,
    ) { }

    public async execute(payload: IRequestConstruction) {
        try {
            await this.constructionRepository.createConstruction(payload);
                
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