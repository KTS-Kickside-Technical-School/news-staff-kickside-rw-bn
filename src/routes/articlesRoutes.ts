import express from 'express';
import articlesControllers from '../controllers/articlesControllers';
import {
    isAreticlesExistsByCategory,
    isArticleAlreadyExists,
    isArticleEditable,
    isArticleEditRequestAlreadyExists,
    isArticleEditRequestExistsAndPending,
    isArticleExists,
    isArticleExistsBySlug,
    isArticleOwned,
} from '../middlewares/articlesMiddleware';
import bodyValidation from '../middlewares/bodyValidation';
import { editArticleSchema, newArticleSchema, postArticleComment } from '../validations/articlesValidations';
import { userAuthorization } from '../middlewares/authorization';
import { isUserExistByUsername } from '../middlewares/authMiddleware';

const articlesRoute = express.Router();

articlesRoute.post("/create-article", userAuthorization(["Editor", "Journalist", "Admin"]), bodyValidation(newArticleSchema), isArticleAlreadyExists, articlesControllers.createNewArticle);
articlesRoute.get("/get-own-articles", userAuthorization(["Editor", "Journalist", "Admin"]), articlesControllers.getOwnArticles);
articlesRoute.get("/get-own-single-article/:id", userAuthorization(["Editor", "Journalist", "Admin"]), isArticleExists, articlesControllers.getSingleArticle);
articlesRoute.post("/request-edit-access/:id", userAuthorization(["Journalist", "Admin", "Editor"]), isArticleExists, isArticleEditRequestAlreadyExists, articlesControllers.requestArticleEditAccess);
articlesRoute.put("/journalist-edit-article/:id", userAuthorization(["Journalist", "Editor", "Admin"]), bodyValidation(editArticleSchema), isArticleExists, isArticleOwned, isArticleEditable, articlesControllers.editArticle);

articlesRoute.get("/get-all-articles", userAuthorization(["Editor", "Admin"]), articlesControllers.getAllArticles);
articlesRoute.put("/toggle-article-publish/:id", userAuthorization(["Editor", "Admin"]), isArticleExists, articlesControllers.toggleArticlePublish);
articlesRoute.put("/editor-edit-article/:id", userAuthorization(["Editor", "Admin"]), bodyValidation(editArticleSchema), isArticleExists, articlesControllers.editArticle);
articlesRoute.get("/get-all-articles-edit-requests", userAuthorization(["Editor", "Admin"]), articlesControllers.getAllArticlesEditRequests);
articlesRoute.put("/confirm-edit-request/:id", userAuthorization(["Editor", "Admin"]), isArticleEditRequestExistsAndPending, articlesControllers.approveArticlesEditRequests);

articlesRoute.get("/get-published-articles", articlesControllers.getPublishedArticles);
articlesRoute.get("/get-single-article/:slug", isArticleExistsBySlug, articlesControllers.getSingleArticle);
articlesRoute.post("/post-comments", bodyValidation(postArticleComment), isArticleExists, articlesControllers.postArticleComment);

articlesRoute.delete("/delete-article/:id", userAuthorization(["Admin"]), isArticleExists, articlesControllers.deleteArticle);
articlesRoute.get("/get-articles-by-category/:category", isAreticlesExistsByCategory, articlesControllers.getArticlesByCategory)
articlesRoute.get("/get-journalists-analytics/:year", userAuthorization(["Journalist", "Admin", "Editor"]), articlesControllers.journalistAnalytics)

articlesRoute.get("/get-author-profile/:username", isUserExistByUsername, articlesControllers.getAuthorProfile);

articlesRoute.get("/get-popular-articles", articlesControllers.getPopularArticles);

articlesRoute.get("/journalist-get-monthly-top", userAuthorization(["Journalist", "Admin", "Editor"]), articlesControllers.journalistGetMonthlyTopArticles)
articlesRoute.get('/journalist/:userId/analytics', articlesControllers.adminFetchJournalistAnalytics);

export default articlesRoute;