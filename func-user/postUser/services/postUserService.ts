import { inject, injectable } from "tsyringe";
import { IReponseData } from "../../shared/interfaces/IReponseData.interface";
import { IUser } from "../../shared/interfaces/IUser.interface";
import IUserRepository from "../../shared/repositories/IUserRepository";

@injectable()
class PostUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) { }

    public async postUserService(body: IUser): Promise<IReponseData> {
        try {
            const user = await this.userRepository.createUser(body);
            
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
                    message: error.message
                }
            }
        }
    }
}

export default PostUserService;