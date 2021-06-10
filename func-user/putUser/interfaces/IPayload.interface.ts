export interface IPayload {
    id?: number,
    completeName: string;
    email: string;
    password?: string;
    position?: string;
    refreshToken: string;
}