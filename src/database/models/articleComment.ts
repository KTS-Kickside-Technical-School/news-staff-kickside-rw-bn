import mongoose, { Schema } from "mongoose";

const articleCommentSchema = new Schema({
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article",
        required: true
    },
    email: {
        type: String,
        required: false
    },
    names: {
        type: String,
        required: false
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true })

const ArticleComment = mongoose.model("ArticleComment", articleCommentSchema);

export default ArticleComment