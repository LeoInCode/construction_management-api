import 'reflect-metadata';
import { injectable } from 'tsyringe';
import { Brackets, getRepository, Repository } from 'typeorm';
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
        { client, responsible, type, displayName, profileId }: IRequestConstruction): Promise<Construction> {
        try {
            const construction = this.ormRepository.create({
                client: client,
                responsible: responsible,
                type: type,
                display_name: displayName,
                profile_id: profileId,
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

    public async getConstructionWithProfileId(profileId: string): Promise<Construction[]> {
        try {
            const construction = await this.ormRepository
                .createQueryBuilder('construction_config')
                .innerJoinAndSelect('construction_config.permissions', 'permissions')
                .where(
                    new Brackets(qb => {
                        if(profileId) {
                            qb.where('construction_config.profile_id = :profileId', { profileId });
                        }
                    })
                )
                .getMany();

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
}

export default ConstructionRepository;