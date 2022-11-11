import { User } from "../entities/user.model";

export interface IBook {
    authorId: number;
    title: string;
    publisher: string;
    author?: User
}
export interface IEditBook {
    authorId?: number;
    title?: string;
    publisher?: string;
    author?: User
}