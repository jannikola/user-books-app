import { Router, Request, Response } from "express";
import { UserService } from "../../../services/user";
import { ResponseBuilder } from "../../../utilities/response";
import {
    can,
    userExist,
    validateCreate,
    validateEdit,
    validateLogin
} from "../../../middleware/user.middleware";
import { ERole } from "../../../enum/role.enum";
import { User } from "../../../entities/user.model";
import { EPermission } from "../../../enum/permission.enum";
import { DeleteResult, UpdateResult } from "typeorm";
export class UserRoutes {
    private router: Router = Router();

    public getRouter(): Router {
        this.router.post(
            "/user/login",
            validateLogin,
            async (req: Request, res: Response) => {
                try {
                    const body = req.body;

                    const result = await UserService.login(body);

                    if (!result) {
                        throw new Error("Something went wrong!");
                    }

                    return new ResponseBuilder<string>()
                        .setData(result)
                        .setStatus(true)
                        .setResponse(res)
                        .setResponseStatus(200)
                        .build();
                } catch (e) {
                    return new ResponseBuilder<Error>()
                        .setData(e.message)
                        .setStatus(false)
                        .setResponse(res)
                        .setResponseStatus(400)
                        .build();
                }
            }
        );

        this.router.post(
            "/user/author",
            validateCreate,
            userExist,
            can(EPermission.ADD_ALL_USERS),
            async (req: Request, res: Response) => {
                try {
                    const body = req.body;

                    const result = await UserService.create(body, ERole.AUTHOR);

                    if (!result) {
                        throw new Error("Something went wrong!");
                    }

                    return new ResponseBuilder<User>()
                        .setData(result)
                        .setStatus(true)
                        .setResponse(res)
                        .setResponseStatus(201)
                        .build();
                } catch (e) {
                    return new ResponseBuilder<Error>()
                        .setData(e.message)
                        .setStatus(false)
                        .setResponse(res)
                        .setResponseStatus(400)
                        .build();
                }
            }
        );

        this.router.put(
            "/user/:id",
            validateEdit,
            can(EPermission.EDIT_ALL_USERS),
            async (req: Request, res: Response) => {
                try {
                    const body = req.body;
                    const user = body.user;
                    delete body.user;

                    const result = await UserService.edit(body, user);

                    if (!result) {
                        throw new Error("Something went wrong!");
                    }

                    return new ResponseBuilder<User>()
                        .setData(result)
                        .setStatus(true)
                        .setResponse(res)
                        .setResponseStatus(200)
                        .build();
                } catch (e) {
                    return new ResponseBuilder<Error>()
                        .setData(e.message)
                        .setStatus(false)
                        .setResponse(res)
                        .setResponseStatus(400)
                        .build();
                }
            }
        );

        this.router.patch(
            "/user/deactivate/:id",
            can(EPermission.DEACTIVATE_ALL_USERS),
            async (req: Request, res: Response) => {
                try {
                    const body = req.body;
                    const result = await UserService.deactivateById(body.user.id);

                    if (!result) {
                        throw new Error("Something went wrong!");
                    }

                    return new ResponseBuilder<UpdateResult>()
                        .setData(result)
                        .setStatus(true)
                        .setResponse(res)
                        .setResponseStatus(200)
                        .build();
                } catch (e) {
                    return new ResponseBuilder<Error>()
                        .setData(e.message)
                        .setStatus(false)
                        .setResponse(res)
                        .setResponseStatus(400)
                        .build();
                }
            }
        );

        this.router.delete(
            "/user/delete/:id",
            can(EPermission.REMOVE_ALL_USERS),
            async (req: Request, res: Response) => {
                try {
                    const body = req.body;
                    const result = await UserService.deleteById(body.user.id);

                    if (!result) {
                        throw new Error("Something went wrong!");
                    }

                    return new ResponseBuilder<DeleteResult>()
                        .setData(result)
                        .setStatus(true)
                        .setResponse(res)
                        .setResponseStatus(200)
                        .build();
                } catch (e) {
                    return new ResponseBuilder<Error>()
                        .setData(e.message)
                        .setStatus(false)
                        .setResponse(res)
                        .setResponseStatus(400)
                        .build();
                }
            }
        );

        return this.router;
    }
}
