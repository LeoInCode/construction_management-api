import { Exception } from "./exception";


export class MemberNotAuthorizedException extends Exception {
    constructor(){
        super("40000", "Não foi possível realizar a operação.", "Membro é potencial fraudolento ou não está ativo.", 400);
    }

    public getError(){
        return {
            type     : "ERROR",
            code     : this.code,
            message  : this.message,            
            details  : this.detail,            
        }
    }
}