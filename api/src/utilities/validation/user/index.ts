import { IUserCreate, IUserLogin } from "../../../interface/user.interface";
import { Schema } from "./schema";

export class Validator {
    static async login(body: IUserLogin) {
        try {
            const loginSchema = Schema.login();
            return await loginSchema.validateAsync(body);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async create(body: IUserCreate) {
        try {
            const loginSchema = Schema.create();
            return await loginSchema.validateAsync(body);
        } catch (e) {
            throw new Error(e.message);
        }
    }
}
