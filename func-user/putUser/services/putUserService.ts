import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../shared/repositories/IUserRepository';
import { IReponseData } from './../../shared/interfaces/IReponseData.interface';
import { IUser } from './../../shared/interfaces/IUser.interface';

@injectable()
class PutUserService {

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository) { }

    public async execute(body: IUser, id: string): Promise<IReponseData> {
        let idFilter = +id;

        try {
            const user = await this.userRepository.updateUser(idFilter, body);

            if(!user) {
                return {
                    status: 400,
                    data: {
                        message: "user not found"
                    }
                }
            }

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
                    message: error
                }
            }
        }
    }

}

export default PutUserService;