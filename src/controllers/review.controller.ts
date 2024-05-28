import { ReviewService } from "@services"
import { Request,Response } from "express"
import { ApiError, ErrorCodes } from "@utils";
import { newRequest } from "@interfaces";
const service = new ReviewService()
export class ReviewController{
    async getAllReviews(req:newRequest,res:Response):Promise<Response>{
        try {
            const {id} = req.params;
            const response = await service.getAllReviews(id);
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
                    message:`Error while getting all reviews : ${error.message}`
                })
            }
        }
    }
    async createReview(req:newRequest,res:Response):Promise<Response>{
        try {
            const {id} = req.params;
            const{rating,review} = req.body;
            const {userid} = req
            const response = await service.addReview(id,userid,rating,review)
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
                    message:`Error while adding the review : ${error.message}`
                })
            }
        }
    }
}