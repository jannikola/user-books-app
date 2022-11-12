import { IBook, IEditBook } from "../../../interface/book.interface";
import { Schema } from "./schema";

export class Validator {
    static async create(body: IBook) {
        try {
            const loginSchema = Schema.create();
            return await loginSchema.validateAsync(body);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async edit(body: IEditBook) {
        try {
            const loginSchema = Schema.edit();
            return await loginSchema.validateAsync(body);
        } catch (e) {
            throw new Error(e.message);
        }
    }
}
