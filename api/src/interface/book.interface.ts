import { User } from "../entities/user.model";

export interface IBook {
    authorId: number;
    title: string;
    publisher: string;
    author?: User
}