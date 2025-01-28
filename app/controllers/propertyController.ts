import { Request, RequestHandler, Response } from "express";
import { Property } from "../../utils/models/property";

const addproperty : RequestHandler = async (req : Request, res : Response) => {
    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type;
    const price = req.body.price;
    const vacancies = req.body.vacancies;
    const amneties = req.body.amneties;
    const location = req.body.location;
    const ownerID = req.header('ownerID');

    try {
        const property = await Property.create({title, description, type, price, vacancies, amneties, location, ownerID});
        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error});
    }
}

const updateproperty : RequestHandler = async (req : Request, res : Response) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type;
    const price = req.body.price;
    const vacancies = req.body.vacancies;
    const amneties = req.body.amneties;
    const location = req.body.location;
    const ownerID = req.header("ownerID");

    try {
        const property = await Property.findByIdAndUpdate(
            {_id: id}, 
            {
                title, 
                description, 
                type, 
                price, 
                vacancies, 
                amneties, 
                location, 
                ownerID
            },
            { new: true }
        );
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}

// get all properties...
const getproperties : RequestHandler = async (req : Request, res : Response) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch {
        res.status(500).json({message: "Internal Server Error"});
    }
}

// get specific property (via ID)
const getproperty : RequestHandler = async (req : Request, res : Response) => {
    const id = req.params.id;
    try {
        const property = await Property.findById(id);
        res.status(200).json(property);
    } catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
}

// find properties of a specific owner...
const findproperty : RequestHandler = async (req : Request, res : Response) => {
    const ownerID = req.header("ownerID");
    console.log(ownerID)
    try {
        const properties = await Property.find(
            {ownerID : ownerID}
        );
        res.status(200).json(properties);
    } catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
}

export { addproperty, updateproperty, getproperty, getproperties, findproperty }