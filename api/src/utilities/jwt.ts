import * as jwt from "jsonwebtoken";
import { ILoggedUser } from "../interface/user.interface";

export class JwtToken {
    /**
     * Get request user
     * @param authorization 
     * @returns 
     */
    static getRequestUser(authorization: string): ILoggedUser {
        try {
            const token = authorization.toString().split(" ")[1];
            return jwt.decode(token) as ILoggedUser;
        } catch (e) {
            throw new Error(e);
        }
    }
    /**
     * Sign token
     * @param userTokenObject
     * @returns token
     */
    static signToken(userTokenObject: ILoggedUser) {
        try {
            return jwt.sign(userTokenObject, process.env.TOKEN_SECRET_KEY, {
                expiresIn: process.env.TOKEN_EXP_TIME,
            });
        } catch (e) {
            throw new Error(e);
        }
    }
}
