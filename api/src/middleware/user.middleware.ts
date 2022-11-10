import e, { Request, Response, NextFunction } from "express";
import { JwtToken } from "../utilities/jwt";
import { UserService } from "../services/user";
import { ResponseBuilder } from "../utilities/response";
import { Validator } from "../utilities/validation/user";
import { EPermission } from "../enum/permission.enum";
import { RolePermissionHelper } from "../utilities/permission";

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
        return new ResponseBuilder<Error>()
            .setData(e.message)
            .setStatus(false)
            .setResponse(res)
            .setResponseStatus(400)
            .build();
    }
};

export const validateCreate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        await Validator.create(body);
        next();
    } catch (e) {
        return new ResponseBuilder<Error>()
            .setData(e.message)
            .setStatus(false)
            .setResponse(res)
            .setResponseStatus(400)
            .build();
    }
};

export const userExist = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        const user = await UserService.getByEmail(body.email);

        if (user) {
            throw new Error("User with this email already exist.");
        }

        next();
    } catch (e) {
        return new ResponseBuilder<Error>()
            .setData(e.message)
            .setStatus(false)
            .setResponse(res)
            .setResponseStatus(400)
            .build();
    }
};

export const canAddAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authorization = req.headers.authorization;
        const requestUser = JwtToken.getRequestUser(authorization);
        const user = await UserService.getById(requestUser.id);

        const permissions = await RolePermissionHelper.getPermissionsArrayForRole(user.role);

        if (!permissions.includes(EPermission.ADD_ALL_USERS)) {
            throw new Error("Forbidden");
        }

        next();
    } catch (e) {
        return new ResponseBuilder<Error>()
            .setData(e.message)
            .setStatus(false)
            .setResponse(res)
            .setResponseStatus(403)
            .build();
    }
};