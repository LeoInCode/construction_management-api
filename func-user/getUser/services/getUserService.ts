import { injectable, inject } from 'tsyringe';
import IUserRepository from '../../shared/repositories/IUserRepository';
import { IUser } from '../../shared/interfaces/IUser.interface';
import AuthService from '../../shared/services/authService';
import tokens from '../../shared/utils/tokens';

@injectable()
class GetUserService {

    private authService: AuthService;

    constructor() { }

    public async execute(token: string) {
        try {
            this.authService = new AuthService();

            const { id, complete_name, email, position } = await tokens.access.verify(token);

            const userFiltered: IUser = {
                id: id,
                completeName: complete_name,
                email: email,
                position: position
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

export default GetUserService;