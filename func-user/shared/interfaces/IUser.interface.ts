export interface IUser {
    completeName: string;
    email: string;
    password: string;
    emailVerify?: boolean;
    position?: string;
}