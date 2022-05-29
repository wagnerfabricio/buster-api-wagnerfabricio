import { dvdRepository } from "../../repositories";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors";
import { ICreateDvd } from "../../interfaces";

const verifyDvdExistsMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { name } = req.validated as ICreateDvd;
  const foundDvd = await dvdRepository.findOneBy({
    name: name,
  });

  if (foundDvd) throw new AppError(`Key (name)=(${name}) already exists.`);

  return next();
};

export default verifyDvdExistsMiddleware;
