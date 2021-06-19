import { InfraException } from "./infra.exception";

export class NotFoundException extends InfraException {
    constructor(codeStatus: string, message: string, detail: string, event: string){
        super(codeStatus, message, detail, event, 404);
    }
}