import { FKDelete } from "../enum/db.enum";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseModel } from "./base.model";
import { User } from "./user.model";

@Entity("book")
export class Book extends BaseModel {
    @ManyToOne(() => User, (author) => author.books, {
        onDelete: FKDelete.CASCADE,
    })
    author: User;

    @Column({ name: "title", nullable: false })
    title: string;

    @Column({ name: "publisher", nullable: false })
    publisher: string;
}
