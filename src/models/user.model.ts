import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    dob:{
        type:Date,
        required:[true,"Date is required"],
    },
    age:{
        type:Number,
        required:[true,"Age is required"],
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","other"],
            message:"{VALUE} is not a valid gender"
        },
        required:[true,"Gender is required"],
    },
    role:{
        type:String,
        enum:{
            values:["producer","actor","director","admin","user"],
            message:"{VALUE} is not a valid role"
        },
        required:[true,"Role is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
})

export const User = mongoose.model("User",userSchema)