export class ApiError extends Error{
    statusCode:number
    message:string
    constructor(statusCode:number,message:string="Something went wromg!"){
        super(message)
        this.message=message,
        this.statusCode=statusCode
    }
}