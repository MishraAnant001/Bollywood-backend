import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    releaseDate:{
        type:Date,
        required:true
    },
    genre:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Genre",
        validate: {
            validator: function (v:any) {
                return Array.isArray(v) && v.length > 0;
            },
            message: 'A movie must have at least one genre.'
        },
        required: true
    },
    cast:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User",
        validate: {
            validator: function (v:any) {
                return Array.isArray(v) && v.length > 0;
            },
            message: 'A movie must have at least one cast.'
        },
        required: true
    },
    producer:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User",
        validate: {
            validator: function (v:any) {
                return Array.isArray(v) && v.length > 0;
            },
            message: 'A movie must have at least one producer.'
        },
        required: true
    },
    director:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    budget:{
        type:Number,
        required:true,
    },
    collections:{
        type:Number,
        required:true,
        default:0
    },
})

export const Movie = mongoose.model("Movie",movieSchema)