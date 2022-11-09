import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "./base.model";
import { RolePermission } from "./rolePermission.model";

@Entity("permission")
export class Permission extends BaseModel {
    @OneToMany(
        (type) => RolePermission,
        (rolePermission) => rolePermission.permission
    )
    rolePermissions: RolePermission[];

    @Column({ name: "type", nullable: false })
    type: string;
}
