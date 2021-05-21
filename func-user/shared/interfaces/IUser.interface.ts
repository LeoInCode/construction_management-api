export interface IUser {
    id?: number,
    completeName: string;
    email: string;
    password?: string;
    emailVerify?: boolean;
    position?: string;
}