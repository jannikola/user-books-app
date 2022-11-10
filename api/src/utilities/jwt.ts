import * as jwt from "jsonwebtoken";
import { ILoggedUser } from "../interface/user.interface";

export class JwtToken {
    /**
     * Sign token
     * @param userTokenObject
     * @returns token
     */
    static async signToken(userTokenObject: ILoggedUser) {
        try {
            console.log({ userTokenObject, sc: process.env.TOKEN_SECRET_KEY, extime: process.env.TOKEN_EXP_TIME })
            return jwt.sign(userTokenObject, process.env.TOKEN_SECRET_KEY, {
                expiresIn: process.env.TOKEN_EXP_TIME,
            });
        } catch (e) {
            throw new Error(e);
        }
    }
}
