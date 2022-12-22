import { NextFunction, Request, Response } from 'express';

export function ErrorHandlerMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  if (!res.statusCode)
    res.status(500);
  
  res.send({ message: err.message });
}