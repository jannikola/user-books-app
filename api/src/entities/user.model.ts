import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "./base.model";
import { Book } from "./book.model";
import { Role } from "./role.model";

@Entity("user")
export class User extends BaseModel {
    @ManyToOne(() => Role, (role) => role.users)
    role: User;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];

    @Column({ name: "email", nullable: false })
    email: string;

    @Column({ name: "password", nullable: false })
    password: string;

    @Column({ name: "first_name", nullable: false })
    firstName: string;

    @Column({ name: "last_name", nullable: false })
    lastName: string;

    @Column({ name: "deactivated_at", nullable: false })
    deactivatedAt: Date;
}
