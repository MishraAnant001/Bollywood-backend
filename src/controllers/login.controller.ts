import { LoginService } from "@services";
import { ICredential } from "@interfaces";
import { Request,Response } from "express";
import { ApiError, ErrorCodes } from "@utils";
const service = new LoginService();

export class LoginController{
    async loginUser(req:Request,res:Response){
        try {
            const userdata:ICredential = req.body;
            const response = await service.loginUser(userdata)
            res.cookie("token",response.data)
            return res.status(response.statusCode).json(response)
        } catch (error:any) {
            if(error instanceof ApiError){
                res.status(error.statusCode).json({
                    success:false,
                    message:error.message
                })
            }else{
                res.status(ErrorCodes.internalServerError).json({
                    success:false,
                    message:`Error while logging in the user : ${error.message}`
                })
            }
        }
    }
}