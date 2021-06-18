import { AxiosResponse } from "axios";
import { IResponseGetUser } from "../IResponseGetUser";

export interface IGetUserEndpoint {
    getUser(accessToken: string, entity: string, action: string): Promise<AxiosResponse<IResponseGetUser>>;
}