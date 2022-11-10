import { Role } from "../../entities/role.model";
import { getManager } from "typeorm";
import { ERole } from "../../enum/role.enum";

export class RoleRepository {
    static getRepo() {
        try {
            return getManager().getRepository(Role);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Base query - alias is: "r"
     * @returns 
     */
    static getBaseQuery() {
        try {
            return this.getRepo().createQueryBuilder("r");
        } catch (e) {
            throw new Error(e);
        }
    }


    static async getByType(type: ERole | string): Promise<Role> {
        try {
            return await this.getBaseQuery()
                .leftJoinAndSelect("r.rolePermissions", "rolePermissions")
                .leftJoinAndSelect("rolePermissions.permission", "permission")
                .where("r.type = :type", { type })
                .getOne();
        } catch (e) {
            throw new Error(e);
        }
    }
}