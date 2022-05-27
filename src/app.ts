import "express-async-errors";
import express from "express";
import { errorHandlerMiddleware } from "./middlewares";

import appRoutes from "./routes";

const app = express();

app.use(express.json());
appRoutes(app);
// app.use(errorHandlerMiddleware);

export default app;
