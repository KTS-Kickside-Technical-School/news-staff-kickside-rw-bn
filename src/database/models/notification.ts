import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true })

const Notification = mongoose.model('Notification', notificationSchema)

