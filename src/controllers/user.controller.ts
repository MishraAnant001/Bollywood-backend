import { UserService } from "@services"
import { Request,Response } from "express"
import { ApiError, ErrorCodes } from "@utils";
import { IUser } from "@interfaces";
const service = new UserService()
export class UserController{
    async getAllUsers(req:Request,res:Response):Promise<Response>{
        try {
            // console.log(req)
            const response = await service.getAllUsers(req.query);
            return res.status(response.statusCode).json(response)
        } catch (error:any) {
            if(error instanceof ApiError){
                return res.status(error.statusCode).json({
                    success:false,
                    message:error.message
                })
            }else{
                return res.status(ErrorCodes.internalServerError).json({
                    success:false,
                    message:`Error while getting all users : ${error.message}`
                })
            }
        }
    }
    async getUserbyId(req:Request,res:Response):Promise<Response>{
        try {
            const {id}=req.params
            const response = await service.getUserById(id)
            return res.status(response.statusCode).json(response)
        } catch (error:any) {
            if(error instanceof ApiError){
                return res.status(error.statusCode).json({
                    success:false,
                    message:error.message
                })
            }else{
                return res.status(ErrorCodes.internalServerError).json({
                    success:false,
                    message:`Error while getting the user : ${error.message}`
                })
            }
        }
    }
    async createUser(req:Request,res:Response):Promise<Response>{
        try {
            const userdata:IUser = req.body;
            const response = await service.createUser(userdata)
            return res.status(response.statusCode).json(response)
        } catch (error:any) {
            return res.status(ErrorCodes.internalServerError).json({
                success:false,
                message:`Error while registering the user : ${error.message}`
            })
        }
    }
    async updateUser(req:Request,res:Response):Promise<Response>{
        try {
            const {id}=req.params
            const userdata:IUser = req.body;
            const response = await service.updateUser(id,userdata)
            return res.status(response.statusCode).json(response)
        } catch (error:any) {
            if(error instanceof ApiError){
                return res.status(error.statusCode).json({
                    success:false,
                    message:error.message
                })
            }else{
                return res.status(ErrorCodes.internalServerError).json({
                    success:false,
                    message:`Error while updating the user : ${error.message}`
                })
            }
        }
    }
    async deleteUser(req:Request,res:Response):Promise<Response>{
        try {
            const {id}=req.params
            const response = await service.deleteUser(id)
            return res.status(response.statusCode).json(response)
        } catch (error:any) {
            if(error instanceof ApiError){
                return res.status(error.statusCode).json({
                    success:false,
                    message:error.message
                })
            }else{
                return res.status(ErrorCodes.internalServerError).json({
                    success:false,
                    message:`Error while deleting the user : ${error.message}`
                })
            }
        }
    }
    async forgotPassword(req:Request,res:Response):Promise<Response>{
        try {
            const{email} = req.body;
            const response = await service.forgotPassword(email as string)
            return res.status(response.statusCode).json(response)
        } catch (error:any) {
            if(error instanceof ApiError){
                return res.status(error.statusCode).json({
                    success:false,
                    message:error.message
                })
            }else{
                return res.status(ErrorCodes.internalServerError).json({
                    success:false,
                    message:`Error while sending otp to the user : ${error.message}`
                })
            }
        }
    }
    async verifyOtp(req:Request,res:Response):Promise<Response>{
        try {
            const{email,otp} = req.body;
            // console.log(email,otp)
            const response = await service.verifyOtp(email as string,Number(otp))
            return res.status(response.statusCode).json(response)
        } catch (error:any) {
            if(error instanceof ApiError){
                return res.status(error.statusCode).json({
                    success:false,
                    message:error.message
                })
            }else{
                return res.status(ErrorCodes.internalServerError).json({
                    success:false,
                    message:`Error while verifying the user : ${error.message}`
                })
            }
        }
    }
    async setPassword(req:Request,res:Response):Promise<Response>{
        try {
            const{email,password} = req.body;
            const response = await service.setPassword(email as string,password as string)
            return res.status(response.statusCode).json(response)
        } catch (error:any) {
            if(error instanceof ApiError){
                return res.status(error.statusCode).json({
                    success:false,
                    message:error.message
                })
            }else{
                return res.status(ErrorCodes.internalServerError).json({
                    success:false,
                    message:`Error while setting the password : ${error.message}`
                })
            }
        }
    }
}