import mongoose, { Schema } from "mongoose";

const subscribersUserListSchema = new Schema ({
    email: {
        type: String,
        required: true
    }
},{timestamps: true})

const SubscriberList = mongoose.model('SubscriberList', subscribersUserListSchema)

export default SubscriberList