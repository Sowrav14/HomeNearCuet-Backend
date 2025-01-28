import { model, models, Schema } from "mongoose";
import { IProperty } from "../types/interfaces";
const mongoose = require("mongoose");

/* Schema for the Item document */
const propertySchema = new Schema<IProperty> (
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        ownerID: {
            type: String,
            required: true
        }
    }
)

const Property = models['Properties'] || model<IProperty>('Properties', propertySchema)
export { Property }