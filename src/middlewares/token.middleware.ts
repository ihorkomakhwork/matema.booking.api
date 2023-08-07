import { NextFunction, Request, RequestHandler, Response } from 'express';
import { config } from 'dotenv';
config();

export const tokenHandlerMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    req.headers.authorization === process.env.TOKEN ||
    req.body?.auth?.application_token === process.env.BITRIX_TOKEN_WEBHOOK
  ) {
    next();
  } else {
    res.status(403).json({ message: 'Доступ до даного матеріалу заблоковано' }).send();
  }
};