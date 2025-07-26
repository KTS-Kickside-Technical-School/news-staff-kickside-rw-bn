import mongoose, { Schema } from "mongoose";

const articleViewSchema = new Schema({
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
}, { timestamps: true });

const ArticleView = mongoose.model('ArticleView', articleViewSchema);

export default ArticleView;