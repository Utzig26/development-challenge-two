import { Request, Response } from 'express';

export function ErrorHandlerMiddleware(err: Error, req: Request, res: Response) {
  res.status(500).json({ message: err });
}