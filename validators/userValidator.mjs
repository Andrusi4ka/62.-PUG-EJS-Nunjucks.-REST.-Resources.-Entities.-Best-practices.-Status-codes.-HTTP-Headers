import { celebrate, Segments, Joi } from 'celebrate';

const userPostSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    name: Joi.string().required().min(3).max(30),
    username: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
});

const userPutSchema = Joi.object({
    name: Joi.string().required().min(3).max(30),
    username: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
});

const userPatchSchema = Joi.object({
    name: Joi.string().optional().min(3).max(30),
    username: Joi.string().optional().min(3).max(30),
    email: Joi.string().email().optional(),
}).min(1);

const idSchema = Joi.object({
    id: Joi.number().integer().positive().required()
})

const validatePostUser = celebrate({
    [Segments.BODY]: userPostSchema
})

const validatePutUser = celebrate({
    [Segments.PARAMS]: idSchema,
    [Segments.BODY]: userPutSchema
})

const validatePatchUser = celebrate({
    [Segments.PARAMS]: idSchema,
    [Segments.BODY]: userPatchSchema.fork(['name', 'username', 'email'], (field) => field.optional())
})

const validateUserId = celebrate({
    [Segments.PARAMS]: idSchema
})

export { validatePostUser, validatePutUser, validatePatchUser, validateUserId }