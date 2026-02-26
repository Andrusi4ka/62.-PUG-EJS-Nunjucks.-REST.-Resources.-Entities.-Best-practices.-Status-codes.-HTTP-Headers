import { celebrate, Segments, Joi } from 'celebrate';

const articlePostSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    name: Joi.string().required().min(3).max(30),
    articlename: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
});

const articlePutSchema = Joi.object({
    name: Joi.string().required().min(3).max(30),
    articlename: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
});

const articlePatchSchema = Joi.object({
    name: Joi.string().optional().min(3).max(30),
    articlename: Joi.string().optional().min(3).max(30),
    email: Joi.string().email().optional(),
}).min(1);

const idSchema = Joi.object({
    id: Joi.number().integer().positive().required()
})

const validatePostArticle = celebrate({
    [Segments.BODY]: articlePostSchema
})

const validatePutArticle = celebrate({
    [Segments.PARAMS]: idSchema,
    [Segments.BODY]: articlePutSchema
})

const validatePatchArticle = celebrate({
    [Segments.PARAMS]: idSchema,
    [Segments.BODY]: articlePatchSchema.fork(['name', 'articlename', 'email'], (field) => field.optional())
})

const validateArticleId = celebrate({
    [Segments.PARAMS]: idSchema
})

export { validatePostArticle, validatePutArticle, validatePatchArticle, validateArticleId }