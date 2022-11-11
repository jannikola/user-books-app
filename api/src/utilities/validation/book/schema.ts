import Joi from "joi";

export class Schema {
    static create() {
        try {
            return Joi.object({
                authorId: Joi.number(),
                title: Joi.string().required(),
                publisher: Joi.string().required(),
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    static edit() {
        try {
            return Joi.object({
                authorId: Joi.number(),
                title: Joi.string(),
                publisher: Joi.string(),
            });
        } catch (e) {
            throw new Error(e);
        }
    }
}