import { injectable, inject } from 'tsyringe';
import AuthService from '../../shared/services/authService';
import { IResponseUser } from '../../shared/interfaces/IUser.interface';
import tokens from '../../shared/utils/tokens'
import User from '../../shared/infra/typeorm/entities/User';

@injectable()
class RefreshTokenService {

    private authService: AuthService;

    constructor() { }

    public async execute(token: string) {
        try {
            this.authService = new AuthService();

            const user: User = await tokens.refresh.verify(token);
            
            await tokens.refresh.invalid(token)

            const accessToken = tokens.access.create(user) //cria o token de usuário logado
            const refreshToken = await tokens.refresh.create(user) //cria um refresh token para o usuário permanecer logado
            
            const userFiltered: IResponseUser = {
                id: user.id,
                completeName: user.complete_name,
                email: user.email,
                cpf: user.cpf,
                accessToken: accessToken,
                refreshToken: refreshToken
            }
            
            return {
                status: 200,
                data: userFiltered
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

export default RefreshTokenService;