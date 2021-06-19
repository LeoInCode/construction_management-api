import { Exception } from "./exception";


export class MemberNotAuthenticatedException extends Exception {
    constructor(){
        super("400", "Não foi possível realizar a operação.", "Membro é potencial fraudolento ou não está ativo.", 400);
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