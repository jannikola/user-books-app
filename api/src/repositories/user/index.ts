import { User } from "../../entities/user.model";
import { getManager, getConnection } from "typeorm";

export class UserRepository {
    static getRepo() {
        try {
            return getManager().getRepository(User);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Base query - alias is: "u"
     * @returns 
     */
    static getBaseQuery() {
        try {
            return this.getRepo().createQueryBuilder("u");
        } catch (e) {
            throw new Error(e);
        }
    }

    static async save(user: User) {
        try {
            return await this.getRepo().save(user);
        } catch (e) {
            throw new Error(e);
        }
    }

    static async getById(id: number): Promise<User> {
        try {
            return await this.getBaseQuery()
                .leftJoinAndSelect("u.role", "role")
                .where("u.id = :id", { id })
                .getOne();
        } catch (e) {
            throw new Error(e);
        }
    }

    static async getByEmail(email: string): Promise<User> {
        try {
            return await this.getBaseQuery()
                .leftJoinAndSelect("u.role", "role")
                .where("u.email = :email", { email })
                .getOne();
        } catch (e) {
            throw new Error(e);
        }
    }

    static async deactivateById(id: number) {
        try {
            return await this.getRepo()
                .createQueryBuilder()
                .update(User)
                .set({ deactivatedAt: new Date() })
                .where("id = :id", { id })
                .execute();
        } catch (e) {
            throw new Error(e);
        }
    }

    static async deleteById(id: number) {
        try {
            return await getConnection()
                .createQueryBuilder()
                .delete()
                .from(User)
                .where("id = :id", { id })
                .execute();
        } catch (e) {
            throw new Error(e);
        }
    }
}