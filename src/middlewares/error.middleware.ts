import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(err.status || 500);
  res.json({ message: err.message });
};
