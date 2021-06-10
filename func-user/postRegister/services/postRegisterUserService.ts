import { inject, injectable } from "tsyringe";
import { IReponseData } from "../../shared/interfaces/IReponseData.interface";
import { IUser } from "../../shared/interfaces/IUser.interface";
import IUserRepository from "../../shared/repositories/IUserRepository";
import AuthService from "../../shared/services/authService";

@injectable()
class PostRegisterUserService {

    private authService: AuthService;

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository) {}

    public async execute(body: IUser): Promise<IReponseData> {
        try {
            this.authService = new AuthService();

            const passwordHash = await this.authService.generatePasswordHash(body.password);

            await this.userRepository.createUser(body, passwordHash);

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

export default PostRegisterUserService;