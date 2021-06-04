import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../shared/repositories/IUserRepository';
import AuthService from '../../shared/services/authService';
import tokens from '../../shared/utils/tokens';
import { IReponseData } from './../../shared/interfaces/IReponseData.interface';
import { IUser } from './../../shared/interfaces/IUser.interface';

@injectable()
class PutUserService {

    private authService: AuthService;

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository) { }

    public async execute(body: IUser, idReceived: string, token: string): Promise<IReponseData> {
        try {
            let idFilter = +idReceived;

            this.authService = new AuthService();

            const { id, complete_name, email, position } = await tokens.access.verify(token);

            if(idFilter != id) {
                throw 'user not authenticated';
            }

            await this.userRepository.updateUser(idFilter, body);

            return {
                status: 200,
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

export default PutUserService;