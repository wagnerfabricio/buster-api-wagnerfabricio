import { userRepository } from "../../repositories";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors";
import { User } from "../../entities";

const verifyUserExistsMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { email } = req.validated as User;
  const foundUser = await userRepository.findOne({
    email: email,
  });

  if (foundUser) throw new AppError(`Key (email)=(${email}) already exists.`);

  return next();
};

export default verifyUserExistsMiddleware;
