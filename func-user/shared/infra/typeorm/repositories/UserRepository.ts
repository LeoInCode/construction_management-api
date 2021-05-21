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
            const emailExists = await this.ormRepository.findOne({
                where: {
                    email: email
                }
            });
            
            if(emailExists) {
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
            throw new Error(error.messsage);
        }
    }

    public async updateUser(id: number, { completeName, password, position }: IUser): Promise<User> {
        try {
            let user = await this.ormRepository.findOne({id: id});

            if(!user) {
                return;
            }

            user.complete_name = completeName;
            user.password = password;
            user.position = position;

            return await this.ormRepository.save(user);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async getUser(id: number): Promise<User> {
        try {
            const user = await this.ormRepository.findOne({id: id});
            
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default UserRepository;