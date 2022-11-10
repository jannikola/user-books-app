import * as express from "express";
import { expressjwt } from "express-jwt";
import { Request, Response, NextFunction } from "express";
import { UserRoutes } from "./v1/user";

export async function apiRoutes(
    app: express.Application
) {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        next();
    });

    app.use(
        expressjwt({
            secret: process.env.TOKEN_SECRET_KEY,
            algorithms: ["HS256"],
        }).unless({
            path: [
                "/api/v1/",
                "/api/v1/user/login",
            ],
        })
    );

    /* eslint-disable */
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err.name === "UnauthorizedError") {
            res.status(401).json({ message: "Invalid token." });
        }
    });

    app.use("/api/v1", new UserRoutes().getRouter());
}