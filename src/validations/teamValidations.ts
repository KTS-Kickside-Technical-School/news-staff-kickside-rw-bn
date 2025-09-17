import Joi from "joi";


const playerInfoSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().optional().allow('', null),
    nationality: Joi.string().optional().allow('', null),
    dateOfBirth: Joi.date().max('now').optional().messages({
        'date.max': 'Birth date cannot be in the future'
    }).allow(null),
    height: Joi.number().optional().allow(null),
    weight: Joi.number().optional().allow(null),
    preferredFoot: Joi.string().optional().allow('', null),
    image: Joi.string().optional().allow('', null),
})

const playerTeamInfoSchema = Joi.object({
    team: Joi.string().required(),
    jerseyNumber: Joi.number().min(1).max(99).messages({
        'number.min': 'Jersey number must be between 1 and 99',
        'number.max': 'Jersey number must be between 1 and 99'
    }).allow(null),
    position: Joi.string().optional().allow('', null),
    playerValue: Joi.number().min(0).optional().messages({
        'number.min': 'Market value cannot be negative'
    }).allow(null),
    contractStatus: Joi.string().optional().allow('', null),
    contractStartDate: Joi.date().optional().allow(null),
    contractEndDate: Joi.when('stillPlaying', {
        is: false,
        then: Joi.date().min(Joi.ref('startDate')).optional().messages({
            'date.min': 'End date must be after start date'
        }),
        otherwise: Joi.optional()
    }).allow(null),
    isStillPlaying: Joi.boolean().required(),
})

export const newTeamPlayerInfoSchema = playerInfoSchema.concat(playerTeamInfoSchema)