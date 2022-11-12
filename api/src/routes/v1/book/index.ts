import { Router, Request, Response } from "express";
import { can, validateCreate, validateEdit } from "../../../middleware/book.middleware";
import { Book } from "../../../entities/book.model";
import { BookService } from "../../../services/book";
import { ResponseBuilder } from "../../../utilities/response";
import { JwtToken } from "../../../utilities/jwt";
import { EPermission } from "../../../enum/permission.enum";
import { DeleteResult } from "typeorm";

export class BookRoutes {
    private router: Router = Router();

    public getRouter(): Router {
        this.router.post(
            "/book",
            validateCreate,
            can(EPermission.ADD_BOOKS),
            async (req: Request, res: Response) => {
                try {
                    const body = req.body;
                    const authorization = req.headers.authorization;
                    const requestUser = JwtToken.getRequestUser(authorization);

                    if (!body.authorId) {
                        body.authorId = requestUser.id;
                    }
                    const result = await BookService.create(body);

                    if (!result) {
                        throw new Error("Something went wrong!");
                    }

                    return new ResponseBuilder<Book>()
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

        this.router.put(
            "/book/:id",
            validateEdit,
            can(EPermission.EDIT_BOOKS),
            async (req: Request, res: Response) => {
                try {
                    const body = req.body;
                    const book = body.book;

                    delete body.book;

                    const result = await BookService.edit(body, book);

                    if (!result) {
                        throw new Error("Something went wrong!");
                    }

                    return new ResponseBuilder<Book>()
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
            "/book/:id",
            can(EPermission.REMOVE_BOOKS),
            async (req: Request, res: Response) => {
                try {
                    const id = Number(req.params.id);
                    const result = await BookService.deleteById(id);

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
