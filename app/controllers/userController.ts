import { Request, RequestHandler, Response } from "express";
import { User } from "../../utils/models/user";
import { loginValidate } from "../../utils/validation/validator";
import { cloudinary } from "../../utils/fileupload/cloudinary";
var bcrypt = require('bcryptjs');

const Signup : RequestHandler = async (req: Request, res: Response) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        // find if user exists
        var user = await User.findOne({username, role});
        if(user){
            res.status(400).json({error: "User with same Username already exists"});
            return;
        }
        user = await User.findOne({email, role});
        if(user){
            res.status(400).json({error: "User with same email already exists"});
            return;
        }
        user = await User.create({
            username : username,
            email : email,
            password : hashedPassword,
            role : role
        });
        res.json({
            status : "success",
            data : user
        });
        return;
    } catch (error) {
        res.status(500).json({error: "Internal server errors"});
        return;
    }
}

const Login : RequestHandler = async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    try{
        // validate input data...
        try {
            await loginValidate.parseAsync({username, password, role});
        } catch(e) {
            res.status(400).json({error: "Invalid input data or format"});
            return;
        }
        var user = await User.findOne({username, role});
        // check if user exists
        if(!user){
            res.status(400).json({error: "User not found"});
            return;
        }
        // check if password is correct
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            res.status(400).json({error: "Invalid password"});
            return;
        }
        res.json({
            status : "success",
            data : user
        });
        return;
    } catch (error) {
        res.status(500).json({error: "Internal server errors"});
        return;
    }
}

const Uploadimage : RequestHandler = async (req: any, res: any) => {
    const userid = req.body.userid;
    const image = req.file;

    try{
        // find if user exists
        var user = await User.findOne({_id : userid});
        if(!user){
            res.status(400).json({error: "User not found"});
            return;
        }
    } catch (error) {
        res.status(500).json({error: "Internal server errors"});
        return;
    }

    try {
        if(!image){
            res.status(400).json({error: "No image provided"});
            return;
        }
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload_stream(
            { folder: 'uploads' }, // Optional: Specify folder in Cloudinary
            async (error, result) => {
            if (error) {
                res.status(400).json({error: "Error in uploading image"});
                return;
            }
            // Update user with image URL
            try{
                const updatedUser = await User.findByIdAndUpdate(
                    userid,
                    { image: result?.secure_url },
                    { new: true }
                )
                if(!updatedUser){
                    res.status(400).json({error: "Error in updating user"});
                    return;
                }
                res.json({
                    status : "success",
                    data : updatedUser
                });
            } catch (error) {
                res.status(500).json({error: "Internal server errors"});
                return;
            }
        }
        ).end(req.file.buffer); // Pass file buffer from Multer

    } catch (error) {
        res.status(500).json({error: "Internal server errors"});
        return;
    }
}

export {
    Signup,
    Login,
    Uploadimage
}