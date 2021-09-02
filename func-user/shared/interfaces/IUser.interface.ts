export interface IUser {
    id?: number,
    completeName: string;
    email: string;
    cpf: string;
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
    cpf: string;
    accessToken: string;
    refreshToken: string;
}