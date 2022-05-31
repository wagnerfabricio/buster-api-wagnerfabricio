import { dvdRepository } from "../../repositories";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors";
import { ICreateDvd } from "../../interfaces";

const verifyDvdExistsOnInsertManyMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const dvdList = req.validated as ICreateDvd[];

  for (const dvd of dvdList) {
    const dvdExists = await dvdRepository.findOneBy({ name: dvd.name });

    if (dvdExists) {
      throw new AppError(`Key (name)=(${dvd.name}) already exists.`, 400);
    }
  }

  return next();
};

export default verifyDvdExistsOnInsertManyMiddleware;
