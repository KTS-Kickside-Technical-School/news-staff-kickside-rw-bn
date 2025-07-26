import mongoose, { Schema } from "mongoose"

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    slug: { type: String, unique: true, required: true },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isEditable: {
        type: Boolean,
        required: false,
        default: false
    },
    status: {
        type: String,
        required: true,
        default: 'unpublished'
    },
    views:{
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Article = mongoose.model('Article', articleSchema);

export default Article;