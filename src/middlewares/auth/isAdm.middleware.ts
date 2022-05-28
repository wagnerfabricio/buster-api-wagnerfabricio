import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors";

const isAdmMiddleware = (req: Request, _: Response, next: NextFunction) => {
  if (!req.decodedUser.isAdm) {
    throw new AppError("missing admin permision", 401);
  }

  return next();
};

export default isAdmMiddleware;
