import { IResponseGetUser } from "../IResponseGetUser";

export interface IHandleContent {
    getUser(accessToken: string, entity: string, action: string): Promise<IResponseGetUser>
}