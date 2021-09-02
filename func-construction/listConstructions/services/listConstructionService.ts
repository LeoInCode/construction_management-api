import 'reflect-metadata';
import { inject, injectable } from "tsyringe";
import { IConstructionRepository } from "../../shared/interfaces/repositories/IConstructionRepository";
import '../../container';

@injectable()
class ListConstructionService {

    constructor(
        @inject('ConstructionRepository')
        private constructionRepository: IConstructionRepository,
    ) { }

    public async execute(profileId: string) {
        try {
            const constructions = await this.constructionRepository.getConstructionWithProfileId(profileId);
            let constructionsFiltered = constructions.map(item => {                
                return {
                    id: item.id,
                    displayName: item.display_name,
                    responsible: item.responsible,
                    client: item.client,
                    profileId: item.profile_id,
                    type: item.type,
                    position: item.permissions[0].position,
                    creationDate: item.creation_date,
                    lastUpdate: item.last_update,
                }
            });

            return {
                status: 200,
                data: constructionsFiltered
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

export default ListConstructionService;