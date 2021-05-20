import { getRepository, Repository } from "typeorm";
import { IUser } from "../../../interfaces/IUser.interface";
import IUserRepository from "../../../repositories/IUserRepository";
import User from "../entities/User";

class UserRepository implements IUserRepository {
    
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async createUser({ completeName, email, password }: IUser): Promise<User> {
        try {
            const emailExists = await this.ormRepository.find({
                where: {
                    email: email
                }
            });
            
            if(emailExists.length > 0) {
                return;
            }

            const user = this.ormRepository.create({
                complete_name: completeName,
                email: email,
                password: password,
                position: 'client'
            });
            
            return await this.ormRepository.save(user);
        } catch (error) {            
            throw new Error(error);
        }
    }
}

export default UserRepository;