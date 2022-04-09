import express from "express";
import createHttpError from "http-errors";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import index from "./components/index.js";
import logger from "./config/logger.js";

const app = express();

//? Enable Morgan middleware
app.use(morgan("dev"));

//? Body Parser
app.use(express.json());
// app.use(express.raw())

//? For Security
app.use(cors());
app.use(helmet());

app.use(express.urlencoded({ extended: false }));

//? Index Router
app.use("/api/v1/", index);

//? This will be fired if the above routes are not found
app.use((req, res, next) => {
	logger.info("ER");
	next(new createHttpError(404, "404 Not Found"));
});

//? Common Express Error Handling through next()
app.use((err, req, res, next) => {
	logger.error(err.stack);
	res.status(err.status).send(err.message);
});

export default app;
