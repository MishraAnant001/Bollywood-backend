import mongoose from "mongoose";

export function connectDB(url:string){
    return mongoose.connect(url)
}