import Joi from "joi";
export class Schema {
    static login() {
        try {
            return Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    static create() {
        try {
            return Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    static edit() {
        try {
            return Joi.object({
                password: Joi.string(),
                firstName: Joi.string(),
                lastName: Joi.string(),
            });
        } catch (e) {
            throw new Error(e);
        }
    }
}
