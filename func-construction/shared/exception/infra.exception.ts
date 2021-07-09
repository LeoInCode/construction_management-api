import { Exception } from "./exception";

export class InfraException extends Exception{

    private eventType : string;
    
    constructor(code: string, message : string, detail: string, eventType : string, status?: number){
        super(code, message, detail, status);
        this.setEventType(eventType);
    }

    public getError(){
        return {
            type      : this.eventType,
            code      : this.code,
            message   : this.message,            
            details   : this.detail            
        }
    }

    public getEventType(): string {
        return this.eventType;
    }

    private setEventType(eventType: string): void {
        this.eventType = eventType;
    }
}