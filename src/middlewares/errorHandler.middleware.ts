import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const errorHandlerMiddleware = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

export default errorHandlerMiddleware
