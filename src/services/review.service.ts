import { Movie, Review } from "@models";
import { ApiResponse } from "../utils/apiresponse";
import { ErrorCodes, SuccessCodes } from "../utils/Status_Code";
import { ApiError } from "../utils/apierror";
import mongoose from "mongoose";

export class ReviewService{
    async getAllReviews(id:string){
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, "Please provide valid movie id!")
        }
        const data = await Review.find({
            movieid:id
        }).select("rating review")
        if(data.length==0){
            throw new ApiError(ErrorCodes.notFound,"No reviews found")
        }
        return new ApiResponse(SuccessCodes.ok,data,"Reviews fetched successfully")
    }
    async addReview(movieid:string,userid:string|undefined,rating:number,review:string){
        if (!mongoose.isValidObjectId(movieid)) {
            throw new ApiError(ErrorCodes.badRequest, "Please provide valid movie id!")
        }
        const movie = await Movie.findOne({
            _id:movieid
        })
        if(!movie){
            throw new ApiError(ErrorCodes.notFound,"No such movie exists!")
        }
        const data = await Review.create({
            movieid:movieid,
            userid:userid,
            rating:rating,
            review:review
        })


        return new ApiResponse(SuccessCodes.ok,data,"Review added successfully")
    }
}