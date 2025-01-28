import { model, models, Schema } from "mongoose";
import { IUser } from "../types/interfaces";
const mongoose = require("mongoose");

/* Schema for the Item document */
const userSchema = new Schema<IUser> (
    {
        username : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        password : {
            type : String, 
            required : true
        },
        role : {
            type : String,
            enum : ["user", "owner"],
            default : "user",
            required : true
        },
        image : {
            type : String,
            default : "https://shmector.com/_ph/6/907397949.png",
        }
    }
)

const User = models['Users'] || model<IUser>('Users', userSchema)
export { User }