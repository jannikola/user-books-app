import { Router, Request, Response } from "express";
import { UserService } from "../../../services/user";
import { ResponseBuilder } from "../../../utilities/response";
import {
    canAdd,
    canEdit,
    userExist,
    validateCreate,
    validateEdit,
    validateLogin
} from "../../../middleware/user.middleware";
import { ERole } from "../../../enum/role.enum";
import { User } from "../../../entities/user.model";
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
            canAdd,
            validateCreate,
            userExist,
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
            canEdit,
            validateEdit,
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

        return this.router;
    }
}
