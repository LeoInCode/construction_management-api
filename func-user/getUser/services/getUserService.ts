import { injectable, inject } from 'tsyringe';
import IUserRepository from '../../shared/repositories/IUserRepository';
import { IUser } from './../../shared/interfaces/IUser.interface';

@injectable()
class GetUserService {

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository) { }

    public async execute(id: string) {
        let idFilter = +id;
        try {
            const user = await this.userRepository.getUser(idFilter);

            if(!user) {
                return {
                    status: 400,
                    data: {
                        message: "user not found"
                    }
                }
            }else {
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
            }


        } catch (error) {
            return {
                status: 400,
                data: {
                    message: error
                }
            }
        }
    }
}

export default GetUserService;