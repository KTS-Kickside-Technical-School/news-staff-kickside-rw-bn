import Joi from "joi";

export const newArticleSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    coverImage: Joi.string().required(),
    category: Joi.string().required()
});


export const editArticleSchema = Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    coverImage: Joi.string(),
    category: Joi.string(),
    status: Joi.string()
})

export const postArticleComment = Joi.object({
    article: Joi.string().required(),
    email: Joi.string(),
    names: Joi.string(),
    comment: Joi.string().required()
})