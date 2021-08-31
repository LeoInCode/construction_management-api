import 'reflect-metadata';
import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { IRequestConstruction } from '../../../../createConstruction/interfaces/IRequestConstruction.interface';
import { InternalServerErrorException } from '../../../exception/internalServerError.exception';
import { NotFoundException } from '../../../exception/notFound.exception';
import Construction from '../entities/Construction';
import { IConstructionRepository } from './../../../interfaces/repositories/IConstructionRepository';

@injectable()
class ConstructionRepository implements IConstructionRepository {
    
    private ormRepository: Repository<Construction>;

    constructor( ) {
        this.ormRepository = getRepository(Construction);
    }

    public async createConstruction(
        { client, responsible, type, displayName, permissions }: IRequestConstruction): Promise<Construction> {
        try {
            const construction = this.ormRepository.create({
                client: client,
                responsible: responsible,
                type: type,
                display_name: displayName,
                permissions_profile_id: permissions
            });

            return await this.ormRepository.save(construction);
        } catch (error) {            
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Construction"
            );
        }
    }

    public async getConstruction(constructionId: number): Promise<Construction> {
        try {
            const construction = await this.ormRepository.findOne({id: constructionId});

            if(!construction) {
                throw new NotFoundException(
                    "400",
                    "Construção não encontrada",
                    "Construção não encontrada",
                    "ERROR"
                );
            }

            return construction;
        } catch (error) {
            if(error.code) {
                throw error;
            }
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Construction"
            );
        }
    }

    public async updateConstruction({ constructionId, permissions }: IRequestConstruction) {
        try {
            const construction = await this.ormRepository.findOne({id: constructionId});

            let parsePermissions = JSON.parse(construction.permissions_profile_id);
            let newProfilePermission = JSON.parse(permissions);

            construction.permissions_profile_id = JSON.stringify({...parsePermissions, newProfilePermission})

            return await this.ormRepository.save(construction);
        } catch (error) {
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Construction"
            );
        }
    }
}

export default ConstructionRepository;