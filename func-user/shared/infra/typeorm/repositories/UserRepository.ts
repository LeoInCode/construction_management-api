import { getRepository, Repository } from "typeorm";
import { GeneralErrorException } from "../../../exception/generalError.exception";
import { InternalServerErrorException } from "../../../exception/internalServerError.exception";
import { NotFoundException } from "../../../exception/notFound.exception";
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
                throw new NotFoundException(
                    "400",
                    "Usuário não encontrado",
                    "Usuário não encontrado",
                    "ERROR"
                )
            }
            
            return user;
        } catch (error) {
            throw new InternalServerErrorException(
                "400",
                error.message,
                "ERROR",
                "Usuário"
            );
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
                throw new GeneralErrorException(
                    "400",
                    "Email já existe",
                    "Email já existe",
                    "ERROR",
                    400
                );
            }
            
            const user = this.ormRepository.create({
                complete_name: completeName,
                email: email,
                password: passwordHash,
                position: 'client'
            });
            
            return await this.ormRepository.save(user);
        } catch (error) {
            throw new InternalServerErrorException(
                "400",
                error.message,
                "ERROR",
                "Usuário"
            );
        }
    }

    public async updateUser(id: number, { completeName, password, position }: IUser): Promise<User> {
        try {
            let user = await this.ormRepository.findOne({id: id});

            if(!user) {
                throw new NotFoundException(
                    "400",
                    "Usuário não encontrado",
                    "Usuário não encontrado",
                    "ERROR"
                )
            }
            
            await this.ormRepository.update({id: id}, {
                complete_name: completeName || user.complete_name,
                password: password || user.password,
                position: position || user.position
            });

            return await this.ormRepository.findOne({id: id});
        } catch (error) {
            throw new InternalServerErrorException(
                "400",
                error.message,
                "ERROR",
                "Usuário"
            );
        }
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
                )
            }
            
            return user;
        } catch (error) {
            throw new InternalServerErrorException(
                "400",
                error.message,
                "ERROR",
                "Usuário"
            );
        }
    }
}

export default UserRepository;