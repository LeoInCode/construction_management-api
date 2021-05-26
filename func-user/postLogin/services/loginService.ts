import { injectable, inject } from 'tsyringe';
import IUserRepository from '../../shared/repositories/IUserRepository';
import AuthService from '../../shared/services/auth';
import { IUser } from '../../shared/interfaces/IUser.interface';

@injectable()
class LoginService {

    private authService: AuthService;

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository) {
            this.authService = new AuthService();
        }

    public async execute(body: IUser, id: string) {
        let idFilter = +id;
        try {
            const user = await this.userRepository.getUser(idFilter);

            await this.authService.verifyPassword(body.password, user.password)

            const userFiltered: IUser = {
                id: user.id,
                completeName: user.complete_name,
                email: user.email,
                position: user.position
            }

            return {
                status: 200,
                data: userFiltered
            }

        } catch (error) {
            return {
                status: 400,
                data: {
                    message: error.message
                }
            }
        }
    }
}

export default LoginService;