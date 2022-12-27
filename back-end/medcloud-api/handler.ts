
import express, { Express, Request, Response, NextFunction } from 'express';
import serverless from "serverless-http";

import { ErrorHandlerMiddleware } from "./src/middlewares/errorHandler.middleware.js"
import { patientsRouter } from "./src/routes/patients.route.js";

const app: Express = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
  });
app.use(express.json());
app.use('/patients', (req: Request, res: Response, next: NextFunction) => { patientsRouter(req, res, next) });

app.use((err: Error, req: Request, res: Response, next: NextFunction) => { ErrorHandlerMiddleware(err, req, res, next) });

export const handler = serverless(app);
