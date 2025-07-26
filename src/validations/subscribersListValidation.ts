import Joi from "joi";

export const subscribersSchema  = Joi.object({
    email: Joi.string().required()
})

export const unsubscriberSchema = Joi.object({
    token: Joi.string().required(),
    email: Joi.string().required()
})