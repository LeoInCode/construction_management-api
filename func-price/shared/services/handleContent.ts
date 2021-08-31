import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IResponseGetUser } from './../interfaces/IResponseGetUser';
import { IGetUserEndpoint } from "../interfaces/endpoints/IGetUserEndpoint";

@injectable()
class HandleContent {

    constructor(
        @inject('GetUserEndpoint')
        private getUserEndpoint: IGetUserEndpoint
    ) { }

    public async getUser(accessToken: string, position: string, entity: string, action: string): Promise<IResponseGetUser> {
        try {            
            const { data } = await this.getUserEndpoint.getUser(accessToken, position, entity, action);

            return data;
        } catch ({response}) {
            throw response.data;
        }
    }
}

export default HandleContent;