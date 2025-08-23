export class ApiError extends Error {
    status:number;
    constructor(statusCode:number,message:string){
        super(message);
        this.status = statusCode;
    }
}

export type ApiErrorTypes = {status:number} & Error