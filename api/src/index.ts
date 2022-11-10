import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { createServer } from "http";
import connection from "./config";
import * as dotenv from "dotenv";
import * as routes from "./routes/routes";

const envConf = dotenv.config();

if (envConf.error) {
	throw envConf.error;
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "1000mb" }));

export const server = createServer(app);

/**
 * Sample of ROOT URL
 *
 * @name welcome
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 * @return {express.Response.body}
 */
app.get("/", async (req: Request, res: Response) => {
	res.status(200).send("Welcome to API!");
});

routes.apiRoutes(app).catch((e) => console.error(e));

connection
	.then(() => {
		console.log("DB Connection");
		server.listen(3000, () => {
			console.log("Server started at http://localhost: 3000");
		});
	})
	.catch((error) => {
		throw new Error(error);
	});
