"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAreticlesExistsByCategory = exports.isArticleHaveComments = exports.isArticleEditRequestExistsAndPending = exports.isArticleEditable = exports.isArticleEditRequestAlreadyExists = exports.isArticleOwned = exports.isArticleExistsBySlug = exports.isArticleExists = exports.isArticleAlreadyExists = void 0;
const articlesRepositories_1 = __importDefault(require("../repository/articlesRepositories"));
const mongoose_1 = __importDefault(require("mongoose"));
const isArticleAlreadyExists = async (req, res, next) => {
    try {
        const article = await articlesRepositories_1.default.findArticleByAttribute("title", req.body.title);
        if (article) {
            return res.status(400).json({
                status: 400,
                message: "Article already exists"
            });
        }
        return next();
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
exports.isArticleAlreadyExists = isArticleAlreadyExists;
const isArticleExists = async (req, res, next) => {
    try {
        const id = req.params.id || req.body.article;
        if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 400,
                message: "Invalid parameters"
            });
        }
        const article = await articlesRepositories_1.default.findArticleByAttribute("_id", id);
        if (!article) {
            return res.status(404).json({
                status: 404,
                message: "Article not found"
            });
        }
        req.article = article;
        const comments = await (0, exports.isArticleHaveComments)(article._id);
        req.comments = comments;
        return next();
    }
    catch (error) {
        console.error("Error in isArticleExists middleware:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};
exports.isArticleExists = isArticleExists;
const isArticleExistsBySlug = async (req, res, next) => {
    try {
        const slug = req.params.slug;
        const article = await articlesRepositories_1.default.findArticleByAttribute("slug", slug);
        if (!article) {
            return res.status(404).json({
                status: 404,
                message: "Article not found"
            });
        }
        req.article = article;
        const comments = await (0, exports.isArticleHaveComments)(article._id);
        req.comments = comments;
        return next();
    }
    catch (error) {
        console.error("Error in isArticleExists middleware:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};
exports.isArticleExistsBySlug = isArticleExistsBySlug;
const isArticleOwned = async (req, res, next) => {
    try {
        const isArticleOwned = req.article.author._id.equals(req.user._id);
        if (!isArticleOwned) {
            return res.status(403).json({
                status: 403,
                message: 'Article not owned by user',
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};
exports.isArticleOwned = isArticleOwned;
const isArticleEditRequestAlreadyExists = async (req, res, next) => {
    try {
        const editRequest = await articlesRepositories_1.default.findArticleEditRequestByAttribute("article", req.article._id);
        if (editRequest && editRequest.isAccepted === false) {
            return res.status(400).json({
                status: 400,
                message: "Edit request already exists!"
            });
        }
        return next();
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
exports.isArticleEditRequestAlreadyExists = isArticleEditRequestAlreadyExists;
const isArticleEditable = async (req, res, next) => {
    try {
        if (req.article.isEditable === false) {
            return res.status(400).json({
                status: 400,
                message: 'Article is not editable'
            });
        }
        return next();
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            mmessage: error.message
        });
    }
};
exports.isArticleEditable = isArticleEditable;
const isArticleEditRequestExistsAndPending = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 400,
                message: "Invalid parameters"
            });
        }
        const editRequest = await articlesRepositories_1.default.findArticleEditRequestByAttribute("_id", id);
        if (!editRequest) {
            return res.status(404).json({
                status: 404,
                message: "Article edit request not found"
            });
        }
        req.editRequest = editRequest;
        return next();
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
exports.isArticleEditRequestExistsAndPending = isArticleEditRequestExistsAndPending;
const isArticleHaveComments = async (article) => {
    const comments = await articlesRepositories_1.default.findArticleComments(article);
    return comments;
};
exports.isArticleHaveComments = isArticleHaveComments;
const isAreticlesExistsByCategory = async (req, res, next) => {
    const { category } = req.params;
    if (!category) {
        return res.status(400).json({
            status: 400,
            message: "Category is required"
        });
    }
    ;
    const articles = await articlesRepositories_1.default.findArticlesByAttribute("category", category);
    if (!articles || articles.length === 0) {
        return res.status(404).json({
            status: 404,
            message: `No articles found for: ${category}`
        });
    }
    req.articles = articles;
    next();
};
exports.isAreticlesExistsByCategory = isAreticlesExistsByCategory;
//# sourceMappingURL=articlesMiddleware.js.map