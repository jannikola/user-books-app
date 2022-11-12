import { Request, Response, NextFunction } from "express";
import { JwtToken } from "../utilities/jwt";
import { UserService } from "../services/user";
import { ResponseBuilder } from "../utilities/response";
import { Validator } from "../utilities/validation/user";
import { EPermission } from "../enum/permission.enum";
import { RolePermissionHelper } from "../utilities/permission";
import { ERole } from "../enum/role.enum";

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
        await Validator.edit(body);
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

export const can = (permission: EPermission) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = Number(req.params.id);
            const authorization = req.headers.authorization;
            const requestUser = JwtToken.getRequestUser(authorization);
            const roleUser = await UserService.getById(requestUser.id);

            const permissions = await RolePermissionHelper.getPermissionsArrayForRole(roleUser.role);
            const havePermission = permissions.includes(permission);
            let isSameUser = null;
            let targetUser = null;
            let isOtherAdminActive = null;
            let isAdmin = null;

            if (id) {
                targetUser = await UserService.getById(id);
                isAdmin = targetUser?.role?.type === ERole.ADMIN;
                isOtherAdminActive = isAdmin && !targetUser?.deactivatedAt;
                isSameUser = roleUser.id === targetUser?.id;
            }

            switch (permission) {
                case EPermission.REMOVE_USERS:
                    if (isSameUser || isOtherAdminActive || !havePermission) {
                        throw new Error("Forbidden");
                    }
                    break;

                case EPermission.DEACTIVATE_USERS:
                    if ((isAdmin && !isSameUser) || (!havePermission && !isSameUser)) {
                        throw new Error("Forbidden");
                    }

                    break;

                case EPermission.EDIT_USERS:
                    if (!havePermission && !isSameUser) {
                        throw new Error("Forbidden");
                    }

                    break;

                default:
                    if (!havePermission) {
                        throw new Error("Forbidden");
                    }
                    break;
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
    }
}