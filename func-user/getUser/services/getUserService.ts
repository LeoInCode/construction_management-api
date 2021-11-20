import { injectable, inject } from 'tsyringe';
import { IUser } from '../../shared/interfaces/IUser.interface';
import AuthService from '../../shared/services/authService';
import tokens from '../../shared/utils/tokens';
import { authorization } from '../../shared/utils/authorization/authorization';
import { IPayloadAuthorization } from '../interfaces/IPayloadAuthorization.interface';

@injectable()
class GetUserService {

    private authService: AuthService;

    constructor() { }

    public async execute(token: string, payload: IPayloadAuthorization) {
        try {
            this.authService = new AuthService();

            const { id, complete_name, email, cpf } = await tokens.access.verify(token);
            
            const { permission } = authorization(payload.position, payload.entity, payload.action);
            
            const userFiltered: IUser = {
                id: id,
                completeName: complete_name,
                email: email,
                cpf: cpf,
                permission: permission
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

export default GetUserService;