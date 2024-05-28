import { Request } from "express"
export interface newRequest extends Request {
    userid?:string,
    role?:string
}