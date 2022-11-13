import { RoleRepository } from "../../repositories/role";
import { ERole } from "../../enum/role.enum";
import { Role } from "../../entities/role.model";

export class RoleService {
    static async getByType(type: ERole | string): Promise<Role> {
        const result = await RoleRepository.getByType(type);

        if (!result) {
            throw new Error("Role not found");
        }

        return result;
    }

    static async getById(id: number): Promise<Role> {
        const result = await RoleRepository.getById(id);

        if (!result) {
            throw new Error("Role not found");
        }

        return result;
    }
}