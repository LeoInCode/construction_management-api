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
        @inject('HandleContent')
        private handleContent: IHandleContent,
    ) { }

    public async execute(token: string, payload: IRequestConstruction) {
        try {
            await this.constructionRepository.createConstruction(payload);
            
            const {
                id,
                completeName,
                email,
                position,
                accessToken,
                refreshToken } = await this.handleContent.updateUser(token, payload.refreshToken);
                
            return {
                status: 200,
                data: {
                    id,
                    completeName,
                    email,
                    position,
                    accessToken,
                    refreshToken
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