import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "node:path";
// import { errorHandler, tokenParserMiddleware } from "./middleware";
import { UsersController } from "./controllers/users.controller";
import { errorHandler, tokenParserMiddleware } from "./middleware";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "static")));

// app.post("/login", AuthController.login);
// app.get("/users", tokenParserMiddleware, UsersController.getUsers);
// app.get("/current-user", tokenParserMiddleware, UsersController.getCurrentUser);
// app.get("/sme-data", tokenParserMiddleware, SmesController.getSme);
// app.get(
// 	"/transactions",
// 	tokenParserMiddleware,
// 	TransactionsController.getTransactions,
// );
// app.get("/articles", tokenParserMiddleware, ArticlesController.getArticles);
// app.get("/articles/:id", tokenParserMiddleware, ArticlesController.getArticle);

app.post("/users/create", async (req, res) => {
	try {
		await UsersController.createUser(req, res);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});
app.get("/users/current-user", tokenParserMiddleware, async (req, res) => {
	console.log("GET CURRENT USER: REQ ===================", req);
	try {
		await UsersController.getCurrentUser(req, res);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});

app.use(errorHandler);

// app.use(errorHandler);
console.log("\n 🚀\x1b[33m rdzcn\x1b[90m mock API online\x1b[93m :) \x1b[0m");
console.log(
	`\n\t\x1b[33m ➜\x1b[37m Running on\x1b[33m \t\thttp://localhost:${process.env.PORT}\x1b[0m`,
);

app.listen(process.env.PORT);
