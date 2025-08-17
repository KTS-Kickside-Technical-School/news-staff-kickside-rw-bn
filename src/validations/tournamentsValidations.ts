import Joi from "joi";

export const newCountrySchema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
    flagUrl: Joi.string().required(),
});

export const newTeamSchema = Joi.object({
    name: Joi.string().required(),
    country: Joi.string().required(),
    logo: Joi.string().required(),
});