import { Request, Response } from "express";
import validate from "../middlewares/signup";
import { Login, Signup, Uploadimage } from "../controllers/userController";
import upload from "../middlewares/multer";


const express = require("express");
const userRouter = express.Router();

// Routes here...

userRouter.get('/', (req : Request, res : Response) => {
    res.json("hi there");
})
userRouter.post('/singup', validate, Signup);
userRouter.post('/login', Login);
userRouter.post('/uploadProfile', upload,  Uploadimage);


module.exports = userRouter;