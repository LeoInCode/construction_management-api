import { IResponseGetUser, IResponseUpdateUser } from "../IResponseUser";

export interface IHandleContent {
    getUser(accessToken: string, position: string, entity: string, action: string): Promise<IResponseGetUser>;
}