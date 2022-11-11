import { Request, Response, NextFunction } from "express";
import { RolePermissionHelper } from "../utilities/permission";
import { EPermission } from "../enum/permission.enum";
import { JwtToken } from "../utilities/jwt";
import { ResponseBuilder } from "../utilities/response";
import { Validator } from "../utilities/validation/book";
import { UserService } from "../services/user";


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

export const can = (permission: EPermission) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const body = req.body;
            const authorization = req.headers.authorization;
            const requestUser = JwtToken.getRequestUser(authorization);
            const user = await UserService.getById(requestUser.id);

            const permissions = await RolePermissionHelper.getPermissionsArrayForRole(user.role);

            if (permission === EPermission.ADD_BOOKS && !permissions.includes(permission) && body.authorId) {
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
    }
}