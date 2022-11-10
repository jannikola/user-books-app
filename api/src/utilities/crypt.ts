import * as bcrypt from "bcrypt";

const defaultSaltRounds = 10;
export class Crypt {
    /**
     * Generate salt rounds
     * @param num number of rounds | default = 10
     * @returns 
     */
    static async genSalt(num = defaultSaltRounds) {
        try {
            return await bcrypt.genSalt(num);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Hash
     * @param key what to hash
     * @param saltRounds num of salt rounds | default = 10
     * @returns 
     */
    static async hash(key: string, saltRounds: number = defaultSaltRounds) {
        try {
            const genSalt = await this.genSalt(saltRounds);
            return await bcrypt.hash(key, genSalt);
        } catch (e) {
            throw new Error(e);
        }
    }
    /**
     * Compare two values
     * @param str value 1 to compare(plain text)
     * @param hash value 2 to compare(hashed password)
     * @returns boolean
     */
    static async compare(str: string, hash: string) {
        try {
            return await bcrypt.compare(str, hash);
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}
