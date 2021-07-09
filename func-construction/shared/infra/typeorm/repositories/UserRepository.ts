import { getRepository, Repository } from "typeorm";
import { InternalServerErrorException } from "../../../exception/internalServerError.exception";
import { NotFoundException } from "../../../exception/notFound.exception";
import IUserRepository from "../../../interfaces/repositories/IUserRepository";
import User from "../entities/User";

class UserRepository implements IUserRepository {
    
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async getUser(id: number): Promise<User> {
        try {
            const user = await this.ormRepository.findOne({id: id});
            
            if(!user) {
                throw new NotFoundException(
                    "400",
                    "Usuário não encontrado",
                    "Usuário não encontrado",
                    "ERROR"
                );
            }
            
            return user;
        } catch (error) {
            if(error.code == "400") {
                throw error;
            }
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Usuário"
            );
        }
    }
}

export default UserRepository;