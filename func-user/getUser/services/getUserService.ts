import { injectable, inject } from 'tsyringe';
import IUserRepository from '../../shared/repositories/IUserRepository';
import { IUser } from '../../shared/interfaces/IUser.interface';
import AuthService from '../../shared/services/authService';
import tokens from '../../shared/utils/tokens';
import { authorization } from '../../shared/utils/authorization/authorization';

@injectable()
class GetUserService {

    private authService: AuthService;

    constructor() { }

    public async execute(token: string, entity: string, action: string) {
        try {
            this.authService = new AuthService();

            const { id, complete_name, email, position } = await tokens.access.verify(token);
            
            const { permission } = authorization(position, entity, action);
            
            const userFiltered: IUser = {
                id: id,
                completeName: complete_name,
                email: email,
                permission: permission
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