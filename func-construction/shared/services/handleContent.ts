import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IResponseGetUser, IResponseUpdateUser } from '../interfaces/IResponseUser';
import { IUserEndpoint } from "../interfaces/endpoints/IGetUserEndpoint";

@injectable()
class HandleContent {

    constructor(
        @inject('UserEndpoint')
        private userEndpoint: IUserEndpoint
    ) { }

    public async getUser(accessToken: string, position: string, entity: string, action: string): Promise<IResponseGetUser> {
        try {            
            const { data } = await this.userEndpoint.getUser(accessToken, position, entity, action);

            return data;
        } catch ({response}) {
            throw response.data;
        }
    }
}

export default HandleContent;