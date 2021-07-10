export interface IResponseGetUser {
    id: number;
    completeName: string;
    email: string;
    position: string;
    permission: {
        all: boolean;
        yourself: boolean;
    }
}

export interface IResponseUpdateUser {
    id: number;
    completeName: string;
    email: string;
    position: string;
    accessToken: string;
    refreshToken: string;
}