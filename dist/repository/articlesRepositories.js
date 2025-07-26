"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const article_1 = __importDefault(require("../database/models/article"));
const articleComment_1 = __importDefault(require("../database/models/articleComment"));
const articlesEditRequest_1 = __importDefault(require("../database/models/articlesEditRequest"));
const articlesViews_1 = __importDefault(require("../database/models/articlesViews"));
const moment_1 = __importDefault(require("moment"));
const findPublishedArticles = async () => {
    return article_1.default.find({ status: 'published' })
        .populate('author')
        .sort({ createdAt: -1 });
};
const findAllArticles = async () => {
    return article_1.default.find()
        .populate('author')
        .sort({ createdAt: -1 });
};
const findArticleByAttribute = async (key, value) => {
    return article_1.default.findOne({ [key]: value }).populate('author');
};
const findArticlesByAttribute = async (key, value) => {
    return await article_1.default.find({ [key]: value }).populate('author').sort({ createdAt: -1 });
};
const saveArticle = async (data) => {
    return await article_1.default.create(data);
};
const saveArticleEditRequest = async (data) => {
    return articlesEditRequest_1.default.create(data);
};
const findArticleEditRequestByAttribute = async (key, value) => {
    return articlesEditRequest_1.default.findOne({ [key]: value });
};
const editArticle = async (_id, data) => {
    return article_1.default.findByIdAndUpdate({ _id }, data, { new: true });
};
const findArticleComments = async (article) => {
    return articleComment_1.default.find({ article });
};
const findArticlesEditRequests = async () => {
    return articlesEditRequest_1.default.find().populate('journalist').populate('article').sort({ isAccepted: 1 });
};
const editArticleEditRequest = async (_id, data) => {
    return await articlesEditRequest_1.default.findByIdAndUpdate({ _id }, data, { new: true });
};
const saveArticleComment = async (data) => {
    return await articleComment_1.default.create(data);
};
const deleteArticle = async (_id) => {
    return await article_1.default.findByIdAndDelete(_id);
};
const saveArticleViewsRecord = async (data) => {
    return await articlesViews_1.default.create(data);
};
const findArticlesByCategory = async (category) => {
    return article_1.default.find({
        category: category,
        status: "published",
    }).populate("author").sort({ createdAt: -1 });
};
const findArticlesByYearAndAttribute = async (key, value, year) => {
    const startOfYear = new Date(`${year}-01-01`);
    const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`);
    const articles = await article_1.default.find({
        [key]: value,
        createdAt: { $gte: startOfYear, $lte: endOfYear }
    })
        .populate("author")
        .sort({ createdAt: -1 });
    return articles;
};
const findMonthlyAnalyticsByYear = async (year, userId) => {
    try {
        const startOfYear = new Date(`${year}-01-01`);
        const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`);
        const monthlyViews = await articlesViews_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfYear, $lte: endOfYear }
                }
            },
            {
                $lookup: {
                    from: "articles",
                    localField: "article",
                    foreignField: "_id",
                    as: "articleDetails"
                }
            },
            {
                $unwind: "$articleDetails"
            },
            {
                $match: {
                    "articleDetails.author": new mongoose_1.default.Types.ObjectId(userId)
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    views: { $sum: 1 }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ]);
        const monthlyComments = await articleComment_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfYear, $lte: endOfYear }
                }
            },
            {
                $lookup: {
                    from: "articles",
                    localField: "article",
                    foreignField: "_id",
                    as: "articleDetails"
                }
            },
            {
                $unwind: "$articleDetails"
            },
            {
                $match: {
                    "articleDetails.author": new mongoose_1.default.Types.ObjectId(userId)
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    comments: { $sum: 1 }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ]);
        const monthlyArticles = await article_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfYear, $lte: endOfYear },
                    author: new mongoose_1.default.Types.ObjectId(userId)
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    articles: { $sum: 1 }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ]);
        const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const currentMonth = new Date().getMonth() + 1;
        const formattedData = Array.from({ length: 12 }, (_, index) => {
            const monthIndex = index + 1;
            if (year < new Date().getFullYear()) {
                const viewData = monthlyViews.find(data => data._id === monthIndex);
                const commentData = monthlyComments.find(data => data._id === monthIndex);
                return {
                    month: monthShortNames[index],
                    views: viewData ? viewData.views : 0,
                    comments: commentData ? commentData.comments : 0
                };
            }
            if (monthIndex > currentMonth) {
                return null;
            }
            const viewData = monthlyViews.find(data => data._id === monthIndex);
            const commentData = monthlyComments.find(data => data._id === monthIndex);
            const articleData = monthlyArticles.find(data => data._id === monthIndex);
            return {
                month: monthShortNames[index],
                views: viewData ? viewData.views : 0,
                comments: commentData ? commentData.comments : 0,
                articles: articleData ? articleData.articles : 0
            };
        }).filter(item => item !== null);
        return formattedData;
    }
    catch (error) {
        console.error('Error fetching monthly analytics:', error);
        throw error;
    }
};
const findArticlesTotalComments = async (articles) => {
    try {
        const commentCounts = await Promise.all(articles.map(async (article) => {
            const comments = await findArticleComments(article._id);
            return comments.length;
        }));
        const totalComments = commentCounts.reduce((sum, count) => sum + count, 0);
        return totalComments;
    }
    catch (error) {
        throw error;
    }
};
const findArticlesTotalViews = async (articles) => {
    try {
        const viewsCounts = await Promise.all(articles.map(async (article) => {
            const views = await findArticleViewsByArticleId(article._id);
            return views.length;
        }));
        const totalViews = viewsCounts.reduce((sum, count) => sum + count, 0);
        return totalViews;
    }
    catch (error) {
        throw error;
    }
};
const findArticleViewsByArticleId = async (articleId) => {
    return await articlesViews_1.default.find({ article: articleId });
};
const findPopularArticles = async () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const articles = await articlesViews_1.default.aggregate([
        {
            $match: {
                createdAt: { $gte: startOfWeek }
            }
        },
        {
            $group: {
                _id: '$article',
                viewsCount: { $sum: 1 }
            }
        },
        { $sort: { viewsCount: -1 } },
        { $limit: 10 },
        {
            $lookup: {
                from: 'articles',
                localField: '_id',
                foreignField: '_id',
                as: 'article'
            }
        },
        { $unwind: '$article' },
        {
            $match: {
                'article.status': 'published',
                'article.isDeleted': false
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'article.author',
                foreignField: '_id',
                as: 'author'
            }
        },
        { $unwind: '$author' },
        {
            $project: {
                _id: 0,
                article: 1,
                viewsCount: 1,
                author: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    username: 1,
                    profile: 1
                }
            }
        }
    ]);
    return articles;
};
const findArticleRelatedArticles = async (article, category) => {
    return await article_1.default.find({
        category: category,
        _id: { $ne: article },
        status: 'published',
    })
        .populate('author')
        .sort({ createdAt: -1 })
        .limit(3);
};
/**
 * Get top read articles for a specific month
 * @param {ObjectId} user - User ID to filter articles by author
 * @param {Number} year - Year (e.g., 2025)
 * @param {Number} month - Month (0-11, where 0 = Jan, 11 = Dec)
 * @param {Number} limit - Max number of articles to return
 * @returns {Promise<Array>} List of top articles
 */
const findTopReadArticlesByMonth = async (user, year, month, limit = 10) => {
    const startOfMonth = moment_1.default.utc({ year, month: month - 1 }).startOf('month').toDate();
    const endOfMonth = moment_1.default.utc({ year, month: month - 1 }).endOf('month').toDate();
    const views = await articlesViews_1.default.aggregate([
        {
            $match: {
                createdAt: { $gte: startOfMonth, $lte: endOfMonth }
            }
        },
        {
            $lookup: {
                from: 'articles',
                localField: 'article',
                foreignField: '_id',
                as: 'articleData'
            }
        },
        { $unwind: '$articleData' },
        {
            $match: {
                'articleData.author': new mongoose_1.default.Types.ObjectId(user)
            }
        },
        {
            $group: {
                _id: '$article',
                count: { $sum: 1 },
                article: { $first: '$articleData' }
            }
        },
        { $sort: { count: -1 } },
        { $limit: limit },
        {
            $lookup: {
                from: 'users',
                localField: 'article.author',
                foreignField: '_id',
                as: 'authorData'
            }
        },
        { $unwind: '$authorData' },
        {
            $project: {
                article: 1,
                count: 1,
                author: {
                    _id: '$authorData._id',
                    firstName: '$authorData.firstName',
                    lastName: '$authorData.lastName'
                }
            }
        }
    ]);
    return views.map(v => ({
        ...v.article,
        views: v.count,
        author: v.author
    }));
};
exports.default = {
    findAllArticles,
    findPublishedArticles,
    findArticleByAttribute,
    findArticlesByAttribute,
    saveArticle,
    saveArticleEditRequest,
    findArticleEditRequestByAttribute,
    editArticle,
    findArticleComments,
    findArticlesEditRequests,
    editArticleEditRequest,
    saveArticleComment,
    deleteArticle,
    saveArticleViewsRecord,
    findArticlesByCategory,
    findArticlesByYearAndAttribute,
    findMonthlyAnalyticsByYear,
    findArticlesTotalComments,
    findArticlesTotalViews,
    findPopularArticles,
    findArticleRelatedArticles,
    findTopReadArticlesByMonth
};
//# sourceMappingURL=articlesRepositories.js.map