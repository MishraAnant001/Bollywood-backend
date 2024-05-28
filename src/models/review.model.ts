import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    movieid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie",
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5
    },
    review:{
        type:String
    }
})

export const Review = mongoose.model("Review",reviewSchema)