import * as bcrypt from "bcrypt";

export class Crypt {
    /**
     * Compare two values
     * @param str value 1 to compare(plain text)
     * @param hash value 2 to compare(hashed password)
     * @returns boolean
     */
    static async compare(str: string, hash: string) {
        try {
            console.log({ str, hash })
            return await bcrypt.compare(str, hash);
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}
