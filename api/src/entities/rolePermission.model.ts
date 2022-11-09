import { FKDelete } from "../enum/db.enum";
import { Entity, ManyToOne } from "typeorm";
import { Role } from "./role.model";
import { BaseModel } from "./base.model";
import { Permission } from "./permission.model";

@Entity("role_permission")
export class RolePermission extends BaseModel {
    @ManyToOne(
        () => Role, (role) => role.rolePermissions, {
        onDelete: FKDelete.CASCADE
    })
    role: Role;

    @ManyToOne(
        () => Permission, (permission) => permission.rolePermissions, {
        onDelete: FKDelete.CASCADE
    })
    permission: Permission;
}
