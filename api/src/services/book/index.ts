import { BookRepository } from "../../repositories/book";
import { Book } from "../../entities/book.model";
import { IBook } from "../../interface/book.interface";
import { UserService } from "../user";

export class BookService {
    static async save(book: Book) {
        return await BookRepository.save(book);
    }

    static async create(data: IBook) {
        const newBook = new Book();
        const author = await UserService.getById(data.authorId);
        delete data.authorId;
        data.author = author;
        Object.assign(newBook, data);

        return await this.save(newBook);
    }
}