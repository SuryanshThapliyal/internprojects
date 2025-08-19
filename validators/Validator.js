import joi from 'joi';

export const userschema = joi.object({
    lat: joi.number().min(-90).max(90).required(),
    lon: joi.number().min(-180).max(180).required()
});

export const schoolSchema = joi.object({
    name: joi.string().min(2).max(100).required(),
    address: joi.string().min(5).max(200).required(),
    latitude: joi.number().min(-90).max(90).required(),
    longitude: joi.number().min(-180).max(180).required()
});
