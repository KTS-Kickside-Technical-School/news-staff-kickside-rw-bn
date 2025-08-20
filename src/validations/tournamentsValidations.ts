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

export const newTournamentSeasonSchema = Joi.object({
    tournament: Joi.string().required(),
    name: Joi.string().required(),
    year: Joi.string().required(),
    teams: Joi.array().items(Joi.string()).required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    status: Joi.string().required()
})

export const newMatchSchema = Joi.object({
    homeTeam: Joi.string().required(),
    awayTeam: Joi.string().required(),
    tournamentSeason: Joi.string().required(),
    matchTime: Joi.string().required(),
})

export const updateMatchSchema = Joi.object({
    tournamentSeason: Joi.string(),
    homeTeam: Joi.string(),
    awayTeam: Joi.string(),
    homeScore: Joi.number(),
    awayScore: Joi.number(),
    matchTime: Joi.string(),
    matchDuration: Joi.string(),
    status: Joi.string(),
})
