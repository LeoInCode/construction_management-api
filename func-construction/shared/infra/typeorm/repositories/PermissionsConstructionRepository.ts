import 'reflect-metadata';
import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '../../../exception/internalServerError.exception';
import { IPermissionsConstructionRepository } from '../../../interfaces/repositories/IPermissionsConstructionRepository';
import Construction from '../entities/Construction';
import PermissionsConstruction from '../entities/PermissionsConstruction';

@injectable()
class PermissionsConstructionRepository implements IPermissionsConstructionRepository {
    
    private ormRepository: Repository<PermissionsConstruction>;

    constructor( ) {
        this.ormRepository = getRepository(PermissionsConstruction);
    }

    public async createPermissionsConstruction(
        construction: Construction, position: string): Promise<PermissionsConstruction> {
        try {
            const permissions = this.ormRepository.create({
                construction_id: construction,
                profile_id: construction.profile_id,
                position: position
            })

            return await this.ormRepository.save(permissions);
        } catch (error) {            
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Permissions"
            );
        }
    }
}

export default PermissionsConstructionRepository;