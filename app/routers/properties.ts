import { Request, Response } from "express";
import { 
    addproperty, 
    getproperties, 
    updateproperty,
    getproperty,
    findproperty
 } from "../controllers/propertyController";

const express = require("express");
const propertyRouter = express.Router();

// Routes here...

// propertyRouter.get('/', (req : Request, res : Response) => {
//     console.log("here");
// })

propertyRouter.get('/', getproperties);
propertyRouter.get('/:id', getproperty);
propertyRouter.put("/find", findproperty)
propertyRouter.put('/add', addproperty);
propertyRouter.put('/update/:id', updateproperty);


module.exports = propertyRouter;