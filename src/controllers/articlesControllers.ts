import { NextFunction, Request, Response } from "express"
import slugify from 'slugify';
import articlesRepositories from "../repository/articlesRepositories"
import authRepositories from "../repository/authRepositories";
import { generateSlug } from "../helpers/articleHelpers";

const getPublishedArticles = async (req: Request, res: Response): Promise<any> => {
    try {
        const articles = await articlesRepositories.findPublishedArticles();
        return res.status(200).json({
            status: 200,
            articles
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const getOwnArticles = async (req: any, res: Response): Promise<any> => {
    try {
        const articles = await articlesRepositories.findArticlesByAttribute("author", req.user._id)
        return res.status(200).json({
            status: 200,
            articles
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const getSingleArticle = async (req: any, res: Response): Promise<any> => {
    try {
        let article = req.article
        await articlesRepositories.saveArticleViewsRecord({ article: article._id });

        const newViews = article.views + 1

        await articlesRepositories.editArticle(article._id, { views: newViews });

        article = await articlesRepositories.findArticleByAttribute("_id", article._id)

        const related = await articlesRepositories.findArticleRelatedArticles(article._id, article.category)

        return res.status(200).json({
            status: 200,
            message: "Article retrieved successfully",
            data:
            {
                article: article,
                comments: req.comments,
                related
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        })
    }
}

const createNewArticle = async (req: any, res: Response): Promise<any> => {
    try {
        req.body.slug = generateSlug(req.body.title)
        req.body.author = req.user._id
        const article = await articlesRepositories.saveArticle(req.body);
        return res.status(201).json({
            status: 201,
            message: "Article created successfully",
            article
        })
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}



const requestArticleEditAccess = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const data = {
            article: req.article._id,
            journalist: req.user._id
        }
        const request = await articlesRepositories.saveArticleEditRequest(data)
        return res.status(201).json({
            status: 201,
            message: "Edit request is sent successfully",
            request
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const editArticle = async (req: any, res: Response): Promise<any> => {
    try {
        req.body.status = "unpublished";
        const article = await articlesRepositories.editArticle(req.article._id, req.body);
        return res.status(200).json({
            status: 200,
            message: "Article updated successfully",
            article
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const getAllArticles = async (req: any, res: Response): Promise<any> => {
    try {
        const articles = await articlesRepositories.findAllArticles();
        return res.status(200).json({
            status: 200,
            message: "Articles retrieved successfully",
            data: {
                articles
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const toggleArticlePublish = async (req: any, res: Response): Promise<any> => {
    try {
        const status = req.article.status === 'published' ? 'unpublished' : 'published';
        const isEditable = false;

        const article = await articlesRepositories.editArticle(req.article._id, { status, isEditable });
        return res.status(200).json({
            status: 200,
            message: 'Article status is changed successfully',
            data: { article }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            mmessage: error.message
        })
    }
}

const getAllArticlesEditRequests = async (req: any, res: Response): Promise<any> => {
    try {
        const editRequests = await articlesRepositories.findArticlesEditRequests();
        return res.status(200).json({
            status: 200,
            message: "Edit articles requests successfully retrieved.",
            data: {
                editRequests
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const approveArticlesEditRequests = async (req: any, res: Response): Promise<any> => {
    try {
        const article = await articlesRepositories.editArticle(req.editRequest.article, { isEditable: true });
        const editRequest = await articlesRepositories.editArticleEditRequest(req.editRequest._id, { isAccepted: true });

        return res.status(200).json({
            status: 200,
            message: "Article requeest is approved successfully",
            data: { article, editRequest }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const postArticleComment = async (req: any, res: Response): Promise<any> => {
    try {
        const comment = await articlesRepositories.saveArticleComment(req.body);
        return res.status(201).json({
            status: 201,
            message: "Comment posted successfully",
            comment
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
};

const deleteArticle = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const deletedArticle = await articlesRepositories.deleteArticle(req.article._id)
        return res.status(200).json({
            status: 200,
            message: "Article deleted successfully",
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })

    }
}

const getArticlesByCategory = async (req: any, res: Response): Promise<any> => {
    try {
        const { category } = req.params;
        const { language } = req.query;
        const articles = await articlesRepositories.findArticlesByCategory(category, language)
        return res.status(200).json({
            status: 200,
            messsage: `Articles in the "${category}" category `,
            data: { articles }
        })

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })

    }
}

const journalistAnalytics = async (req: any, res: Response): Promise<any> => {
    try {
        const { year } = req.params;

        const articles = await articlesRepositories.findArticlesByYearAndAttribute("author", req.user._id, year);
        const comments = await articlesRepositories.findArticlesTotalComments(articles);
        const views = await articlesRepositories.findArticlesTotalViews(articles);
        const monthlyAnalytics = await articlesRepositories.findMonthlyAnalyticsByYear(year, req.user._id);

        return res.status(200).json({
            status: 200,
            message: "Analytics retrieved successfully",
            data: {
                totalArticles: articles.length,
                totalComments: comments,
                totalViews: views,
                monthlyAnalytics
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const getAuthorProfile = async (req: any, res: Response): Promise<any> => {
    try {
        const { username } = req.params;
        const { language } = req.query
        const user = await authRepositories.findUserByUsernames(username);
        const plainUser = user.toJSON()
        delete plainUser.password;
        const articles = await authRepositories.findArticlesByAuthor(user._id, language);
        const relatedJournalists = await authRepositories.findRelatedJournalists(user._id);

        return res.status(200).json({
            status: 200,
            message: "Author Details Fetched Successfully",
            data: {
                author: plainUser,
                articles,
                relatedJournalists,
            },
        });

    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
};

const getPopularArticles = async (req: any, res: Response): Promise<any> => {
    try {
        const { language } = req.query
        const articles = await articlesRepositories.findPopularArticles(language);
        return res.status(200).json({
            status: 200,
            message: "Popular Articles Fetched Successfully",
            data: { articles }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const journalistGetMonthlyTopArticles = async (req: any, res: Response): Promise<any> => {
    try {
        const year = parseInt(req.query.year) || new Date().getFullYear();
        const month = parseInt(req.query.month) || new Date().getMonth();

        if (month < 1 || month > 12) {
            return res.status(400).json({ status: 400, message: "Invalid month value" });
        }

        const monthsTopRead = await articlesRepositories.findTopReadArticlesByMonth(req.user._id, year, month);
        return res.status(200).json({
            status: 200,
            message: "Monthly Top Articles Fetched Successfully",
            data: { monthsTopRead }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
};


export const adminFetchJournalistAnalytics = async (req, res) => {
    try {
        const { userId } = req.params;

        const analytics = await articlesRepositories.adminGetJournalistAnalytics(userId);
        res.status(200).json({
            status: 200,
            message: "Data analytics retrieved successsfully",
            data: analytics
        });
    } catch (error) {
        console.error('Analytics fetch failed:', error);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
};

const getTopFeaturedArticles = async (req: any, res: Response): Promise<any> => {
    try {
        const language = req.query.language

        const articles = await articlesRepositories.findTopFeaturedArticles(language);

        return res.status(200).json({
            status: 200,
            message: "Top featured articles fetched successfully",
            data: { articles }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const getTOpWeeklyArticlesByCategories = async (req: any, res: Response): Promise<any> => {
    try {
        const language = req.query.language
        const articles = await articlesRepositories.findArticlesByCategoryWithWeeklyTop(language);
        return res.status(200).json({
            status: 200,
            message: "Top weekly articles by categories fetched successfully",
            data: articles
        })

    }
    catch (error: any) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const userSearchArticles = async (req: Request, res: Response): Promise<any> => {
    try {
        const { query = '', page = 1, limit = 35, language } = req.query;

        const data = await articlesRepositories.searchArticles({
            query: String(query),
            page: Number(page),
            limit: Number(limit),
            language: language
        });

        return res.status(200).json({ status: 200, ...data });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const getTheLatestArticlesCustomized = async (req: Request, res: Response): Promise<any> => {
    try {
        const { limit } = req.query;
        const articles = await articlesRepositories.findUsersLatestArticlesCustomized(Number(limit) || 25);

        return res.status(200).json({
            status: 200,
            message: "Latest articles fetched successfully",
            data: articles
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}
export default {
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
    adminFetchJournalistAnalytics,
    getTopFeaturedArticles,
    getTOpWeeklyArticlesByCategories,
    userSearchArticles,
    getTheLatestArticlesCustomized
}