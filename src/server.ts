import express from "express";
import cors from "cors";
import serverlessHttp from "serverless-http";
import { RegisterRoutes } from "./generated/routes/routes";
import swaggerJson from "./generated/swagger/swagger.json";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import { forwardedPrefixMiddleware } from "./forwardedPrefixMiddleware";
import { init } from "./services/catService";

init();

export const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(forwardedPrefixMiddleware);

app.use(
    "/api-docs",
    swaggerUi.serveWithOptions({ redirect: false }),
    swaggerUi.setup(swaggerJson)
);

RegisterRoutes(app);

export const handler = serverlessHttp(app);
