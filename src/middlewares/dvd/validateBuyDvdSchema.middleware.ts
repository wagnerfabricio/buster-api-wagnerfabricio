import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

const buyDvdSchema = yup.object().shape({
  dvdId: yup.string().required(),
  quantity: yup.number().required(),
});

const validateBuyDvdSchemaMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { dvdId } = req.params;
  const { quantity } = req.body;

  const validatePayload = {
    dvdId,
    quantity,
  };

  try {
    await buyDvdSchema.validate(validatePayload, {
      abortEarly: false,
      stripUnknown: true,
    });
    return next();
  } catch (error) {
    return res.status(400).json({ message: error.errors });
  }
};

export default validateBuyDvdSchemaMiddleware;
