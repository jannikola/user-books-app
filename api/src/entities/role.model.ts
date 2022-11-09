import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "./base.model";
import { RolePermission } from "./rolePermission.model";
import { User } from "./user.model";

@Entity("role")
export class Role extends BaseModel {
    @OneToMany(() => User, (user) => user.role)
    users: User[];

    @OneToMany(() => RolePermission,
        (rolePermission) => rolePermission.role
    )
    rolePermissions: RolePermission[];

    @Column({ name: "type", nullable: false })
    type: string;
}
