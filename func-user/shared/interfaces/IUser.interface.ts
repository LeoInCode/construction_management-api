export interface IUser {
    id?: number,
    completeName: string;
    email: string;
    password?: string;
    emailVerify?: boolean;
    position?: string;
}

export interface IResponseLogin {
    id: number,
    completeName: string;
    email: string;
    position: string;
    accessToken: string;
    refreshToken: string;
}