import { User } from "@models"
import { ApiError, ApiResponse, ErrorCodes, SuccessCodes } from "@utils"
import mongoose from "mongoose";
import { ParsedQs } from "qs"
import bcrypt from "bcrypt"
import { IUser } from "@interfaces";

export class UserService {
    async getAllUsers(user: ParsedQs) {
        const { usertype } = user
        let data = null;
        if (!usertype) {

            data = await User.find({role:{
                $in:["actor","director","producer","user"]
            }}).select("name dob age gender role");
        } else {
            data = await User.find({ role: usertype }).select("name dob age gender role");
        }
        if (data.length == 0) {
            throw new ApiError(ErrorCodes.notFound, "No users found!")
        }
        return new ApiResponse(SuccessCodes.ok, data, "users fetched successfully")
    }
    async getUserById(userid: string) {
        if (!mongoose.isValidObjectId(userid)) {
            throw new ApiError(ErrorCodes.badRequest, "Please provide valid user id!")
        }
        const data = await User.findById(userid)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No user found!")
        }
        return new ApiResponse(SuccessCodes.ok, data, "user fetched successfully")
    }
    async createUser(userdata: IUser) {
        userdata.password = await bcrypt.hash(userdata.password, 10)
        const data = await User.create(userdata);
        return new ApiResponse(SuccessCodes.created, data, "user registered succcessfully")

    }
    async updateUser(userid: string, userdata: IUser) {
        if (!mongoose.isValidObjectId(userid)) {
            throw new ApiError(ErrorCodes.badRequest, "Please provide valid user id!")
        }
        const data = await User.findByIdAndUpdate(userid, userdata)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No user found!")
        }
        return new ApiResponse(SuccessCodes.ok, data, "user updated successfully")
    }
    async deleteUser(userid: string) {
        if (!mongoose.isValidObjectId(userid)) {
            throw new ApiError(ErrorCodes.badRequest, "Please provide valid user id!")
        }
        const data = await User.findByIdAndDelete(userid)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No user found!")
        }
        return new ApiResponse(SuccessCodes.ok, data, "user deleted successfully")
    }
}