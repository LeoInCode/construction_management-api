import { AxiosResponse } from "axios";
import { IUserEndpoint } from "../../../interfaces/endpoints/IGetUserEndpoint";
import { IResponseGetUser, IResponseUpdateUser } from "../../../interfaces/IResponseUser";
import { UserAPI } from "../config/api/getUserApi.config";

export default class UserEndpoint implements IUserEndpoint {
    
    public async getUser(accessToken: string, entity: string, action: string): Promise<AxiosResponse<IResponseGetUser>> {
        return UserAPI.get(`/user?entity=${entity}&action=${action}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    public async updateUser(accessToken: string, refreshToken: string): Promise<AxiosResponse<IResponseUpdateUser>> {
        const position = 'admin';
        return UserAPI.put('/user', {
            position,
            refreshToken
        },{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
}