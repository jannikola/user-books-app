import { RoleService } from "../services/role";
import { Role } from "../entities/role.model";
import { UserService } from "../services/user";
import { IRoleTargetUser } from "../interface/permission.interface";

export class RolePermissionHelper {
    static async getPermissionsArrayForRole(data: Role): Promise<string[]> {
        const role = await RoleService.getByType(data.type);
        const rolePermissions = role.rolePermissions;
        const arr = [];
        for (const rolePermission of rolePermissions) {
            arr.push(rolePermission.permission.type);
        }

        return arr;
    }

    static async getRoleAndTargetUsers(roleUserId: number, targetUserId: number): Promise<IRoleTargetUser> {
        const [roleUser, targetUser] = await Promise.all([
            UserService.getById(roleUserId),
            UserService.getById(targetUserId),
        ]);

        return {
            roleUser,
            targetUser,
        }
    }
}