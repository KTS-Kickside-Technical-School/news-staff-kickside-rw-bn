import mongoose, { Schema } from "mongoose";

const inquirySchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending","solved"],
        default: "pending"
    }
}, {timestamps: true})

const Inquiry = mongoose.model("Inquiry", inquirySchema)

export default Inquiry

