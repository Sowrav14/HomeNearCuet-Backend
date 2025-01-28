import { model, models, Schema } from "mongoose";
import { IPImages } from "../types/interfaces";
const mongoose = require("mongoose");

/* Schema for the Item document */
const pimageSchema = new Schema<IPImages> (
    {
        propertyID: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }
)

const PImage = models['PImages'] || model<IPImages>('PImages', pimageSchema)
export { PImage }