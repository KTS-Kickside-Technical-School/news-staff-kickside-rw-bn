"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminFetchJournalistAnalytics = void 0;
const slugify_1 = __importDefault(require("slugify"));
const articlesRepositories_1 = __importDefault(require("../repository/articlesRepositories"));
const authRepositories_1 = __importDefault(require("../repository/authRepositories"));
const getPublishedArticles = async (req, res) => {
    try {
        const articles = await articlesRepositories_1.default.findPublishedArticles();
        return res.status(200).json({
            status: 200,
            articles
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const getOwnArticles = async (req, res) => {
    try {
        const articles = await articlesRepositories_1.default.findArticlesByAttribute("author", req.user._id);
        return res.status(200).json({
            status: 200,
            articles
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const getSingleArticle = async (req, res) => {
    try {
        let article = req.article;
        await articlesRepositories_1.default.saveArticleViewsRecord({ article: article._id });
        const newViews = article.views + 1;
        await articlesRepositories_1.default.editArticle(article._id, { views: newViews });
        article = await articlesRepositories_1.default.findArticleByAttribute("_id", article._id);
        const related = await articlesRepositories_1.default.findArticleRelatedArticles(article._id, article.category);
        return res.status(200).json({
            status: 200,
            message: "Article retrieved successfully",
            data: {
                article: article,
                comments: req.comments,
                related
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
};
const createNewArticle = async (req, res) => {
    try {
        req.body.slug = generateSlug(req.body.title);
        req.body.author = req.user._id;
        const article = await articlesRepositories_1.default.saveArticle(req.body);
        return res.status(201).json({
            status: 201,
            message: "Article created successfully",
            article
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const generateSlug = (title) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const time = Date.now();
    const baseSlug = (0, slugify_1.default)(title, {
        lower: true,
        strict: true,
    });
    return `${year}-${month}-${baseSlug}-${time}`;
};
const requestArticleEditAccess = async (req, res, next) => {
    try {
        const data = {
            article: req.article._id,
            journalist: req.user._id
        };
        const request = await articlesRepositories_1.default.saveArticleEditRequest(data);
        return res.status(201).json({
            status: 201,
            message: "Edit request is sent successfully",
            request
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const editArticle = async (req, res) => {
    try {
        req.body.status = "unpublished";
        const article = await articlesRepositories_1.default.editArticle(req.article._id, req.body);
        return res.status(200).json({
            status: 200,
            message: "Article updated successfully",
            article
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const getAllArticles = async (req, res) => {
    try {
        const articles = await articlesRepositories_1.default.findAllArticles();
        return res.status(200).json({
            status: 200,
            message: "Articles retrieved successfully",
            data: {
                articles
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const toggleArticlePublish = async (req, res) => {
    try {
        const status = req.article.status === 'published' ? 'unpublished' : 'published';
        const isEditable = false;
        const article = await articlesRepositories_1.default.editArticle(req.article._id, { status, isEditable });
        return res.status(200).json({
            status: 200,
            message: 'Article status is changed successfully',
            data: { article }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            mmessage: error.message
        });
    }
};
const getAllArticlesEditRequests = async (req, res) => {
    try {
        const editRequests = await articlesRepositories_1.default.findArticlesEditRequests();
        return res.status(200).json({
            status: 200,
            message: "Edit articles requests successfully retrieved.",
            data: {
                editRequests
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const approveArticlesEditRequests = async (req, res) => {
    try {
        const article = await articlesRepositories_1.default.editArticle(req.editRequest.article, { isEditable: true });
        const editRequest = await articlesRepositories_1.default.editArticleEditRequest(req.editRequest._id, { isAccepted: true });
        return res.status(200).json({
            status: 200,
            message: "Article requeest is approved successfully",
            data: { article, editRequest }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const postArticleComment = async (req, res) => {
    try {
        const comment = await articlesRepositories_1.default.saveArticleComment(req.body);
        return res.status(201).json({
            status: 201,
            message: "Comment posted successfully",
            comment
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const deleteArticle = async (req, res, next) => {
    try {
        const deletedArticle = await articlesRepositories_1.default.deleteArticle(req.article._id);
        return res.status(200).json({
            status: 200,
            message: "Article deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const getArticlesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const articles = await articlesRepositories_1.default.findArticlesByCategory(category);
        return res.status(200).json({
            status: 200,
            messsage: `Articles in the "${category}" category `,
            data: { articles }
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const journalistAnalytics = async (req, res) => {
    try {
        const { year } = req.params;
        const articles = await articlesRepositories_1.default.findArticlesByYearAndAttribute("author", req.user._id, year);
        const comments = await articlesRepositories_1.default.findArticlesTotalComments(articles);
        const views = await articlesRepositories_1.default.findArticlesTotalViews(articles);
        const monthlyAnalytics = await articlesRepositories_1.default.findMonthlyAnalyticsByYear(year, req.user._id);
        return res.status(200).json({
            status: 200,
            message: "Analytics retrieved successfully",
            data: {
                totalArticles: articles.length,
                totalComments: comments,
                totalViews: views,
                monthlyAnalytics
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const getAuthorProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await authRepositories_1.default.findUserByUsernames(username);
        const plainUser = user.toJSON();
        delete plainUser.password;
        const articles = await authRepositories_1.default.findArticlesByAuthor(user._id);
        const relatedJournalists = await authRepositories_1.default.findRelatedJournalists(user._id);
        return res.status(200).json({
            status: 200,
            message: "Author Details Fetched Successfully",
            data: {
                author: plainUser,
                articles,
                relatedJournalists,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const getPopularArticles = async (req, res) => {
    try {
        const articles = await articlesRepositories_1.default.findPopularArticles();
        return res.status(200).json({
            status: 200,
            message: "Popular Articles Fetched Successfully",
            data: { articles }
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const journalistGetMonthlyTopArticles = async (req, res) => {
    try {
        const year = parseInt(req.query.year) || new Date().getFullYear();
        const month = parseInt(req.query.month) || new Date().getMonth();
        console.log(month);
        if (month < 1 || month > 12) {
            return res.status(400).json({ status: 400, message: "Invalid month value" });
        }
        const monthsTopRead = await articlesRepositories_1.default.findTopReadArticlesByMonth(req.user._id, year, month);
        return res.status(200).json({
            status: 200,
            message: "Monthly Top Articles Fetched Successfully",
            data: { monthsTopRead }
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
const adminFetchJournalistAnalytics = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId);
        const analytics = await articlesRepositories_1.default.adminGetJournalistAnalytics(userId);
        res.status(200).json({
            status: 200,
            message: "Data analytics retrieved successsfully",
            data: analytics
        });
    }
    catch (error) {
        console.error('Analytics fetch failed:', error);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
};
exports.adminFetchJournalistAnalytics = adminFetchJournalistAnalytics;
exports.default = {
    getPublishedArticles,
    getAllArticles,
    getOwnArticles,
    getSingleArticle,
    createNewArticle,
    requestArticleEditAccess,
    editArticle,
    toggleArticlePublish,
    getAllArticlesEditRequests,
    approveArticlesEditRequests,
    postArticleComment,
    deleteArticle,
    getArticlesByCategory,
    journalistAnalytics,
    getAuthorProfile,
    getPopularArticles,
    journalistGetMonthlyTopArticles,
    adminFetchJournalistAnalytics: exports.adminFetchJournalistAnalytics
};
//# sourceMappingURL=articlesControllers.js.map