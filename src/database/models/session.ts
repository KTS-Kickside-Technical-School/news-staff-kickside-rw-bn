import mongoose, { Schema } from "mongoose"

const sessionSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Session = mongoose.model('Session', sessionSchema)

export default Session;