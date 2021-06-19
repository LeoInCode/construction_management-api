import { InfraException } from "./infra.exception";

export class InternalServerErrorException extends InfraException {
    constructor(codeStatus: string, message: string, event: string, system: string){
        super(codeStatus, message, `Ocorreu um erro interno no servidor do sistema ${system}.`, event, 500);
    }
}