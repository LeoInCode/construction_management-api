import 'reflect-metadata';
import { inject, injectable } from "tsyringe";
import { IConstructionRepository } from "../../shared/interfaces/repositories/IConstructionRepository";
import { IRequestConstruction } from "../interfaces/IRequestConstruction.interface";

@injectable()
class CreateConstructionService {

    constructor(
        @inject('ConstructionRepository')
        private constructionRepository: IConstructionRepository
    ) { }

    public async execute(payload: IRequestConstruction) {
        try {            
            await this.constructionRepository.createConstruction(payload);

            return {
                status: 200,
                data: {
                    status: "success"
                }
            }
        } catch (error) {
            throw error;
        }
    }
}

export default CreateConstructionService;