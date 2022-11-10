import { Request, Response, NextFunction } from "express";
import { Validator } from "../utilities/validation/user";

export const validateLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        await Validator.login(body);
        next();
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};