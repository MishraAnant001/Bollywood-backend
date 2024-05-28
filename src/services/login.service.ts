import {User} from "@models"
import { ICredential } from "@interfaces";
import bcrypt from "bcrypt"
import config from"config"
import jwt from "jsonwebtoken"
import { ApiError,ApiResponse,ErrorCodes, SuccessCodes  } from "@utils";

export class LoginService{
    async loginUser(userdata:ICredential){
        const user = await User.findOne({email:userdata.email});
        if(!user){
            throw new ApiError(ErrorCodes.notFound,"No user found!")
        }
        const verify = await bcrypt.compare(userdata.password,user.password)
        if(!verify){
            throw new ApiError(ErrorCodes.unauthorized,"Invalid password!")
        }
        const secretkey :string = config.get("SECRET_KEY")
        const token =jwt.sign({
            userid:user._id,
            role:user.role
        },secretkey,{
            expiresIn:"24h"
        })
        return new ApiResponse(SuccessCodes.ok,token,"login successfull!")
    }
}