import { User } from "../entities/user.model";

export interface IRoleTargetUser {
    roleUser: User;
    targetUser: User;
}