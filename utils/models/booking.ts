import { model, models, Schema } from "mongoose";
import { IBooking } from "../types/interfaces";
const mongoose = require("mongoose");

/* Schema for the Item document */
const bookingSchema = new Schema<IBooking> (
    {
        propertyID: {
            type: String,
            required: true
        },
        userID: {
            type: String,
            required: true
        },
        checkIn: {
            type: Date,
            required: true
        }
    }
)

const Booking = models['Bookings'] || model<IBooking>('Bookings', bookingSchema)
export { Booking }