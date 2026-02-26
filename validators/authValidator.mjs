import { celebrate, Joi, Segments } from 'celebrate';

const registerSchema = Joi.object({
    name: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(128).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(128).required()
});

export const validateRegister = celebrate({
    [Segments.BODY]: registerSchema
});

export const validateLogin = celebrate({
    [Segments.BODY]: loginSchema
});
