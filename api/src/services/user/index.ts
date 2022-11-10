import { Crypt } from "../../utilities/crypt";
import { ILogin } from "../../interface/user.interface";
import { UserRepository } from "../../repositories";
import { JwtToken } from "../../utilities/jwt";
import { User } from "../../entities/user.model";

export class UserService {
    static async getByEmail(email: string): Promise<User> {
        const result = await UserRepository.getByEmail(email);

        if (!result) {
            throw new Error("User not found.")
        }

        return result;
    }

    static async login(body: ILogin): Promise<string> {
        const { email, password } = body;

        const user = await this.getByEmail(email);
        const passwordMatch = await Crypt.compare(password, user.password);

        if (!passwordMatch) {
            return null;
        }

        const token = await JwtToken.signToken({
            id: user.id,
            email: user.email,
        });

        return token;
    }
}