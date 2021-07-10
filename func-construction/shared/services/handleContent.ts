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

    public async getUser(accessToken: string, entity: string, action: string): Promise<IResponseGetUser> {
        try {            
            const { data } = await this.userEndpoint.getUser(accessToken, entity, action);

            return data;
        } catch ({response}) {
            throw response.data;
        }
    }

    public async updateUser(accessToken: string, refreshToken: string): Promise<IResponseUpdateUser> {
        try {            
            const { data } = await this.userEndpoint.updateUser(accessToken, refreshToken);

            return data;
        } catch ({response}) {
            throw response.data;
        }
    }
}

export default HandleContent;