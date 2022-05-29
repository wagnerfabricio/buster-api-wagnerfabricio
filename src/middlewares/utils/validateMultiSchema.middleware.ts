import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import { ICreateDvd } from "../../interfaces";

const validateMultiSchemaMiddleware =
  (shape: AnySchema, lisOf: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedList: Promise<ICreateDvd[]> = Promise.all(
        req.body[lisOf].map(
          async (value: object) =>
            await shape.validate(value, {
              abortEarly: false,
              stripUnknown: true,
            })
        )
      );

      req.validated = await validatedList;

      return next();
    } catch (error) {
      return res.status(400).json({ message: error.errors });
    }
  };

export default validateMultiSchemaMiddleware;
