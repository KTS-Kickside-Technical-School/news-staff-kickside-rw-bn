import Joi from "joi";

export const inquirySchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().required(),
    topic: Joi.string().required(),
    message: Joi.string().required(),
})

export const updateInquirySchema = Joi.object({
    status: Joi.string().required().valid("pending","solved")
})