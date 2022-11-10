import { Request, Response, NextFunction } from "express";
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

export const validateEdit = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        const user = body.user;
        delete body.user;

        await Validator.edit(body);

        body.user = user;
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

export const canAdd = async (
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

export const canEdit = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = Number(req.params.id);
        const authorization = req.headers.authorization;
        const requestUser = JwtToken.getRequestUser(authorization);

        const [roleUser, targetUser] = await Promise.all([
            UserService.getById(requestUser.id),
            UserService.getById(id),
        ])

        const permissions = await RolePermissionHelper.getPermissionsArrayForRole(roleUser.role);

        if (!permissions.includes(EPermission.EDIT_ALL_USERS) && requestUser.id !== targetUser.id) {
            throw new Error("Forbidden");
        }

        req.body.user = targetUser;

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