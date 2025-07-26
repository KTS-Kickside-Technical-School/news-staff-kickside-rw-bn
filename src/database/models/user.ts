import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Object,
        required: true
    },
    isDisabled: {
        type: Boolean,
        default: false,
        required: false
    },
    disableReason: {
        type: String,
        default: null,
        required: false
    },
    rank: {
        type: String,
        default: null,
        required: false
    },
    bio: {
        type: String,
        default: null,
        required: false
    },
    profile: {
        type: String,
        default: null,
        required: false
    },
    phone: {
        type: String,
        default: null,
        required: false
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User;