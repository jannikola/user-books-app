import { RoleService } from "../services/role";
import { Role } from "../entities/role.model";

export class RolePermissionHelper {
    static async getPermissionsArrayForRole(data: Role) {
        const role = await RoleService.getByType(data.type);
        const rolePermissions = role.rolePermissions;
        const arr = [];
        for (const rolePermission of rolePermissions) {
            arr.push(rolePermission.permission.type);
        }

        return arr;
    }
}