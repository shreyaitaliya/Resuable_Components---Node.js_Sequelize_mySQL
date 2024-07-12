const joi = require('joi');

const categorySchema = joi.object({
    categoryname: joi.string().required(),
    qty: joi.number().integer().min(0).required(),
    price: joi.number().positive().required(),
    description: joi.string().required(),
    color: joi.string().required(),
    AddedBy: joi.string()
});

const updateCategorySchema = joi.object({
    categoryname: joi.string().optional(),
    qty: joi.number().integer().min(0).optional(),
    price: joi.number().positive().optional(),
    description: joi.string().optional(),
    color: joi.string().optional()
});

module.exports = { categorySchema, updateCategorySchema }