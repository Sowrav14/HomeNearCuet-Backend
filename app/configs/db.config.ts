//importing modules
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

//details from the env
const dbString = `${process.env.DB_URL}/${process.env.DB_NAME}`;

//db connection
export const db = mongoose.connect(dbString)

.then(res => {
    if(res){
        console.log(`Database connection succeffully to ${process.env.DB_NAME}`)
    }
}).catch(err => {
    console.log("Error Connecting Database");
    console.log(err)
})