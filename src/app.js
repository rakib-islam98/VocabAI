import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js"
import routes from "./routes/index.js"

const app = express();

/*
|--------------------------------------------------------------------------
| Core Middlewares
|--------------------------------------------------------------------------
*/

app.use(helmet());

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));

app.use(express.json());  //this allow express to use JSON.stringfy(JS Object) and JSON.parse(SSON String) whenever needed 
app.use(express.urlencoded({ extended: true }));

/*
|--------------------------------------------------------------------------
| Health Route
|--------------------------------------------------------------------------
*/

app.use("/api/v1", routes);

/*
|--------------------------------------------------------------------------
| 404 Middleware
|--------------------------------------------------------------------------
*/

app.use(notFoundMiddleware);

/*
|--------------------------------------------------------------------------
| Global Error Middleware
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);

export default app;