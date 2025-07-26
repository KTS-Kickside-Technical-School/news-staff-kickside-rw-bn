import mongoose, { Schema } from "mongoose";

const articlesEditRequestsSchema = new Schema({
    article: {
        type: mongoose.Types.ObjectId,
        ref: "Article",
        required: true
    },
    journalist: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    isAccepted: {
        type: Boolean,
        required: false,
        default: false
    }
}, { timestamps: true })

const ArticlesEditRequest = mongoose.model("ArticlesEditRequest", articlesEditRequestsSchema)

export default ArticlesEditRequest;