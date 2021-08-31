import { AxiosResponse } from "axios";
import { IGetUserEndpoint } from "../../../interfaces/endpoints/IGetUserEndpoint";
import { IResponseGetUser } from "../../../interfaces/IResponseGetUser";
import { GetUserAPI } from "../config/api/getUserApi.config";

export default class GetUserEndpoint implements IGetUserEndpoint {
    
    public async getUser(accessToken: string, position: string, entity: string, action: string): Promise<AxiosResponse<IResponseGetUser>> {
        return GetUserAPI.get(`/user?entity=${entity}&action=${action}&position=${position}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
}