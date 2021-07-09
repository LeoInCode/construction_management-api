export abstract class Exception extends Error{
    
    protected code      : string;    
    protected detail    : string;    
    protected status    : number;

    constructor(code: string, message : string, detail: string, status?: number){
        super(message);
        this.code    = code;
        this.message = message;
        this.detail  = detail;        
        this.setStatus(status);
    }

    abstract getError();

    public getStatus(): number {
        return this.status;
    }

    private setStatus(status: number): void {
        this.status = status;
    }
}