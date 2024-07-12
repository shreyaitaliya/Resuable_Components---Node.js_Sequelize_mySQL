const joi = require('joi');

const CreateUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
})

module.exports = { CreateUserSchema, loginSchema }