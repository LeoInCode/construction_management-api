import { AxiosResponse } from "axios";
import { IResponseGetUser, IResponseUpdateUser } from "../IResponseUser";

export interface IUserEndpoint {
    getUser(accessToken: string, entity: string, action: string): Promise<AxiosResponse<IResponseGetUser>>;
}