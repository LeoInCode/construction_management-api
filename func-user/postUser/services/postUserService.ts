import { inject, injectable } from "tsyringe";
import { IReponseData } from "../../shared/interfaces/IReponseData.interface";
import { IUser } from "../../shared/interfaces/IUser.interface";
import IUserRepository from "../../shared/repositories/IUserRepository";

@injectable()
class PostUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository) { }

    public async execute(body: IUser): Promise<IReponseData> {
        try {
            const user = await this.userRepository.createUser(body);
            
            if(!user) {
                return {
                    status: 400,
                    data: {
                        message: "email already exists"
                    }
                }
            }

            return {
                status: 201,
                data: {
                    message: "success"
                }
            }            
        } catch (error) {
            throw {
                status: 400,
                data: {
                    message: error
                }
            }
        }
    }
}

export default PostUserService;