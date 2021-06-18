import { IGetUserEndpoint } from "../interfaces/endpoints/IGetUserEndpoint";

class HandleContent {

    constructor(
        private getUserEndpoint: IGetUserEndpoint
    ) { }

    public async getUser(accessToken: string, entity: string, action: string) {
        try {            
            const { data } = await this.getUserEndpoint.getUser(accessToken, entity, action);

            return data;
        } catch ({response}) {
            throw response.data;
        }
    }
}

export default HandleContent;