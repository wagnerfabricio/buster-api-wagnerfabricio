import { Router } from "express";
import { cartController, dvdController } from "../controllers";
import {
  isAdmMiddleware,
  validateBuyDvdSchemaMiddleware,
  validateSchemaMiddleware,
  verifyDvdExistsMiddleware,
  verifyTokenMiddleware,
} from "../middlewares";
import { verifyDvdExistsOnInsertManyMiddleware } from "../middlewares/dvd";
import { validateMultiSchemaMiddleware } from "../middlewares/utils";
import { createDvdSchema } from "../schemas";

const dvdRoutes = Router();

dvdRoutes.post(
  "/registerOne",
  verifyTokenMiddleware,
  isAdmMiddleware,
  validateSchemaMiddleware(createDvdSchema),
  verifyDvdExistsMiddleware,
  dvdController.create
);
dvdRoutes.post(
  "/register",
  verifyTokenMiddleware,
  isAdmMiddleware,
  validateMultiSchemaMiddleware(createDvdSchema, "dvds"),
  verifyDvdExistsOnInsertManyMiddleware,
  dvdController.createMany
);
dvdRoutes.get("", dvdController.retrieveAll);
dvdRoutes.post(
  "/buy/:dvdId",
  verifyTokenMiddleware,
  validateBuyDvdSchemaMiddleware,
  cartController.buy
);

export default dvdRoutes;
