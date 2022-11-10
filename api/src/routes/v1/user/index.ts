import { Router, Request, Response } from "express";
import { UserService } from "../../../services/user";
import { ResponseBuilder } from "../../../utilities/response";
import { validateLogin } from "../../../middleware/user.middleware";

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

        return this.router;
    }
}
