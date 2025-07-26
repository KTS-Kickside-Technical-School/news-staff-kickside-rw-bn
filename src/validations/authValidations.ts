import Joi from "joi";

export const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

export const forgotPasswordSchema = Joi.object({
    email: Joi.string().required()
})

export const resetPasswordSchema = Joi.object({
    password: Joi.string().required(),
    token: Joi.string().required()
})

export const logoutSchema = Joi.object({
    token: Joi.string().required()
});

export const updateProfileSchema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    username: Joi.string().required(),
    email: Joi.string().optional(),
    password: Joi.string().optional(),
    bio: Joi.string().optional(),
    profile: Joi.string().optional(),
    phone: Joi.string().optional()
});


export const changePasswordSchema = Joi.object({
    password: Joi.string().required(),
    newPassword: Joi.string().required()
})