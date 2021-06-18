import { inject, injectable } from 'tsyringe';
import User from '../../shared/infra/typeorm/entities/User';
import { IResponseUser } from '../../shared/interfaces/IUser.interface';
import IUserRepository from '../../shared/repositories/IUserRepository';
import AuthService from '../../shared/services/authService';
import tokens from '../../shared/utils/tokens';
import { IPayload } from '../interfaces/IPayload.interface';
import { IReponseData } from './../../shared/interfaces/IReponseData.interface';

@injectable()
class PutUserService {

    private authService: AuthService;

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository) { }

    public async execute(body: IPayload, accessToken: string): Promise<IReponseData> {
        try {

            this.authService = new AuthService();

            const { id, complete_name, email, position } = await tokens.access.verify(accessToken);

            if(body.password) {
                const passwordHash = await this.authService.generatePasswordHash(body.password);
                body.password = passwordHash;
            }

            const user: User = await this.userRepository.updateUser(id, body);
            
            await tokens.refresh.invalid(body.refreshToken)
            await tokens.access.invalid(accessToken)

            const accessTokenCriado = tokens.access.create(user) //cria o token de usuário logado
            const refreshToken = await tokens.refresh.create(user) //cria um refresh token para o usuário permanecer logado
            
            const userFiltered: IResponseUser = {
                id: user.id,
                completeName: user.complete_name,
                email: user.email,
                position: user.position,
                accessToken: accessTokenCriado,
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

export default PutUserService;