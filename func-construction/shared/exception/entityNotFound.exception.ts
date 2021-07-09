import { InfraException } from "./infra.exception";

export class EntityNotFoundException extends InfraException {
    constructor(codeStatus, message: string, entity: string, event: string, id: string){
        super(codeStatus, message, `${entity} não encontrado. id: ${id}`, event, 404);
    }
}