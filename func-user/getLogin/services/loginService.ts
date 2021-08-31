import { injectable, inject } from 'tsyringe';
import IUserRepository from '../../shared/repositories/IUserRepository';
import AuthService from '../../shared/services/authService';
import { IResponseUser } from '../../shared/interfaces/IUser.interface';
import tokens from '../../shared/utils/tokens'

@injectable()
class LoginService {

    private authService: AuthService;

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository) { }

    public async execute(email: string, password: string) {
        try {
            this.authService = new AuthService();

            const user = await this.userRepository.getUserByEmail(email);
            
            await this.authService.verifyPassword(password, user.password);
            
            const accessToken = tokens.access.create(user) //cria o token de usuário logado
            const refreshToken = await tokens.refresh.create(user) //cria um refresh token para o usuário permanecer logado
            
            const userFiltered: IResponseUser = {
                id: user.id,
                completeName: user.complete_name,
                email: user.email,
                accessToken: accessToken,
                refreshToken: refreshToken
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