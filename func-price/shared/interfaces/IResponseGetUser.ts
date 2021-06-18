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