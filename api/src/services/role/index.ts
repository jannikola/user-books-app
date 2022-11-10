import { RoleRepository } from "../../repositories/role";
import { ERole } from "../../enum/role.enum";

export class RoleService {
    static async getByType(type: ERole | string) {
        const result = await RoleRepository.getByType(type)

        if (!result) {
            throw new Error("Role not found");
        }

        return result;
    }
}