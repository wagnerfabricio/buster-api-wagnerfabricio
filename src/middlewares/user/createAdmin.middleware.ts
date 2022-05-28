import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { userRepository } from "../../repositories";

export const createAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(req.validated as User).isAdm) return next();

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("missing authorization token", 401);
  }

  let decodedId = "";

  verify(
    token as string,
    process.env.SECRET_KEY as string,
    (err: VerifyErrors, decoded: JwtPayload) => {
      if (err) {
        return res.status(401).json({
          error: {
            name: "JsonWebTokenError",
            message: "jwt malformed",
          },
        });
      }
      decodedId = decoded.id;
    }
  );

  const authorizedUser = await userRepository.findOne({
    id: decodedId,
  });

  if (!authorizedUser) {
    {
      return res.status(401).json({
        error: {
          name: "JsonWebTokenError",
          message: "jwt malformed",
        },
      });
    }
  }

  if (!authorizedUser.isAdm) {
    throw new AppError("missing admin permission", 401);
  }

  req.decodedUser = authorizedUser;
  next();
};
export default createAdminMiddleware;
