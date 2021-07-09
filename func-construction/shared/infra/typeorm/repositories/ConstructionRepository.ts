import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { IRequestConstruction } from '../../../../createConstruction/interfaces/IRequestConstruction.interface';
import { InternalServerErrorException } from '../../../exception/internalServerError.exception';
import IUserRepository from '../../../interfaces/repositories/IUserRepository';
import Construction from '../entities/Construction';
import { IConstructionRepository } from './../../../interfaces/repositories/IConstructionRepository';

@injectable()
class ConstructionRepository implements IConstructionRepository {
    
    private ormRepository: Repository<Construction>;

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {
        this.ormRepository = getRepository(Construction);
    }

    public async createConstruction(
        { userId, client, responsible, type, displayName }: IRequestConstruction): Promise<Construction> {
        try {
            const user = await this.userRepository.getUser(userId);            

            const construction = this.ormRepository.create({
                user_id: user,
                client: client,
                responsible: responsible,
                type: type,
                display_name: displayName
            });

            return await this.ormRepository.save(construction);
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