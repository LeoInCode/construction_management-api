import { IResponseGetUser, IResponseUpdateUser } from "../IResponseUser";

export interface IHandleContent {
    getUser(accessToken: string, entity: string, action: string): Promise<IResponseGetUser>;
}