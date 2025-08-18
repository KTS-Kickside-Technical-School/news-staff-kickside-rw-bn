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

export const newYearSchema = Joi.object({
    startYear: Joi.number().required(),
    endYear: Joi.number().required(),
    isLatest: Joi.boolean()
})

export const newTournamentSchema = Joi.object({
    name: Joi.string().required(),
    country: Joi.string().required(),
    description: Joi.string().required(),
    foundedYear: Joi.string().required(),
    type: Joi.string().required(),
})