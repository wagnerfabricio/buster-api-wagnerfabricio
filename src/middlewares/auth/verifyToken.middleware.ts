import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";
import { AppError } from "../../errors";
import { userRepository } from "../../repositories";

const verifyTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("Missing authorization token.", 401);
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

  req.decodedUser = authorizedUser;
  next();
};

export default verifyTokenMiddleware;
