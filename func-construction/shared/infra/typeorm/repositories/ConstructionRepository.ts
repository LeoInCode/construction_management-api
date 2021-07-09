import { getRepository, Repository } from 'typeorm';
import Construction from '../entities/Construction';
import { IConstructionRepository } from './../../../interfaces/repositories/IConstructionRepository';

class ConstructionRepository implements IConstructionRepository {
    
    private ormRepository: Repository<Construction>;

    constructor() {
        this.ormRepository = getRepository(Construction);
    }

    public async createConstruction(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    
}

export default ConstructionRepository;