// src/validation/productValidation.ts
import Joi from 'joi';

export const productSchema = Joi.object({
    name: Joi.string().required(),
    sku: Joi.string().required(),
    description: Joi.string().required(),
    cost: Joi.number().precision(2).required(),
    price: Joi.number().precision(2).required(),
    stock: Joi.number().integer().required()
});

export const productIdSchema = Joi.object({
    id: Joi.number().integer().required()
});
