import { Crypt } from "../../utilities/crypt";
import { ILogin, IUserCreate, IUserEdit } from "../../interface/user.interface";
import { UserRepository } from "../../repositories/user";
import { JwtToken } from "../../utilities/jwt";
import { User } from "../../entities/user.model";
import { RoleService } from "../role";
import { ERole } from "../../enum/role.enum";

export class UserService {
    static async save(user: User): Promise<User> {
        return await UserRepository.save(user);
    }

    static async create(data: IUserCreate, role: ERole): Promise<User> {
        const newUser = new User();
        newUser.role = await RoleService.getByType(role);
        const hashPassword = await Crypt.hash(data.password);
        data.password = hashPassword;

        Object.assign(newUser, data);

        return await this.save(newUser);
    }

    static async edit(data: IUserEdit, user: User): Promise<User> {
        if (data.password) {
            const hashPassword = await Crypt.hash(data.password);
            data.password = hashPassword;
        }

        Object.assign(user, data);

        return await this.save(user);
    }

    static async getById(id: number): Promise<User> {
        const result = await UserRepository.getById(id);

        if (!result) {
            throw new Error("User not found.");
        }

        return result;
    }

    static async getByEmail(email: string): Promise<User> {
        return await UserRepository.getByEmail(email);
    }

    static async login(data: ILogin): Promise<string> {
        const { email, password } = data;

        const user = await this.getByEmail(email);

        if (!user) {
            throw new Error("User not found.")
        }

        const passwordMatch = await Crypt.compare(password, user.password);

        if (!passwordMatch) {
            return null;
        }

        return JwtToken.signToken({
            id: user.id,
            email: user.email,
        });
    }

    static async deactivateById(id: number) {
        return await UserRepository.deactivateById(id);
    }
}