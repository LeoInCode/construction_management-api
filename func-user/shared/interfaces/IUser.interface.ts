export interface IUser {
    id?: number,
    completeName: string;
    email: string;
    password?: string;
    emailVerify?: boolean;
    permission?: {
        all: boolean,
        yourself: boolean
    }
}

export interface IResponseUser {
    id: number,
    completeName: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}