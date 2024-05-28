import { UserService } from "@services";
import { Request, Response } from "express";
import { IUser } from "@interfaces";
import { ErrorCodes } from "@utils";
const service = new UserService()
export class SignupController{
    async signupUser(req:Request,res:Response){
        try {
            const userdata:IUser = req.body;
            const response = await service.createUser(userdata)
            return res.status(response.statusCode).json(response)
        } catch (error:any) {
            res.status(ErrorCodes.internalServerError).json({
                success:false,
                message:`Error while registering the user : ${error.message}`
            })
        }
    }
}