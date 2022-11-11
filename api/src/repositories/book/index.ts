import { getConnection, getManager } from "typeorm";
import { Book } from "../../entities/book.model";

export class BookRepository {
    static getRepo() {
        try {
            return getManager().getRepository(Book);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Base query - alias is: "b"
     * @returns 
     */
    static getBaseQuery() {
        try {
            return this.getRepo().createQueryBuilder("b");
        } catch (e) {
            throw new Error(e);
        }
    }

    static async save(book: Book) {
        try {
            return await this.getRepo().save(book);
        } catch (e) {
            throw new Error(e);
        }
    }

    static async getById(id: number): Promise<Book> {
        try {
            return await this.getBaseQuery()
                .leftJoinAndSelect("b.author", "author")
                .where("b.id = :id", { id })
                .getOne();
        } catch (e) {
            throw new Error(e);
        }
    }

    static async deleteById(id: number) {
        try {
            return await getConnection()
                .createQueryBuilder()
                .delete()
                .from(Book)
                .where("id = :id", { id })
                .execute();
        } catch (e) {
            throw new Error(e);
        }
    }
}