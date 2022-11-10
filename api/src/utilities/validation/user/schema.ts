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
}
