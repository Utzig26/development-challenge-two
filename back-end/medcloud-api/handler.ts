
import express, { Express, Request, Response, NextFunction } from 'express';

import { ErrorHandlerMiddleware } from "./src/middlewares/errorHandler.middleware";
import serverless from "serverless-http";
import patientsRouter from "./src/routes/patients.route";

const app: Express = express();

app.use(express.json());
app.use('/patients', (req: Request, res: Response, next: NextFunction) => { patientsRouter(req, res, next) });

app.use((err: Error, req: Request, res: Response, next: NextFunction) => { ErrorHandlerMiddleware(err, req, res, next) });

export const handler = serverless(app);
