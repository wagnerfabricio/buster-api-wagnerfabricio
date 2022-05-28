import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { userRepository } from "../../repositories";

export const authUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("missing authorization token", 401);
  }

  jwt.verify(
    token as string,
    process.env.SECRET_KEY as string,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({
          error: {
            name: "JsonWebTokenError",
            message: "jwt malformed",
          },
        });
      }

      async (decoded: { id: string }) => {
        const authorizedUser: User = await userRepository.findOne({
          id: decoded.id,
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
      };

      next();
    }
  );
};

export default authUserMiddleware;



