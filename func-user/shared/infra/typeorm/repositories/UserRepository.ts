import { getRepository, Repository } from "typeorm";
import { IUser } from "../../../interfaces/IUser.interface";
import IUserRepository from "../../../repositories/IUserRepository";
import User from "../entities/User";

class UserRepository implements IUserRepository {
    
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async getUserByEmail(email: string): Promise<User> {
        try {
            const user = await this.ormRepository.findOne({
                where: {
                    email: email
                }
            });
            
            if(!user) {
                throw "user not found";
            }
            
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async createUser({ completeName, email, password }: IUser, passwordHash: string): Promise<User> {
        try {
            const emailExists = await this.ormRepository.findOne({
                where: {
                    email: email
                }
            });
            
            if(emailExists) {
                throw "email already exists";
            }
            
            const user = this.ormRepository.create({
                complete_name: completeName,
                email: email,
                password: passwordHash,
                position: 'client'
            });
            
            return await this.ormRepository.save(user);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async updateUser(id: number, { completeName, password, position }: IUser): Promise<User> {
        try {
            let user = await this.ormRepository.findOne({id: id});

            if(!user) {
                throw "user not found";
            }
            
            await this.ormRepository.update({id: id}, {
                complete_name: completeName || user.complete_name,
                password: password || user.password,
                position: position || user.position
            });

            return await this.ormRepository.findOne({id: id});
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getUser(id: number): Promise<User> {
        try {
            const user = await this.ormRepository.findOne({id: id});

            if(!user) {
                throw "user not found";
            }
            
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default UserRepository;