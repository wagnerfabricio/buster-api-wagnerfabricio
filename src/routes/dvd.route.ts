import { Router } from "express";
import { dvdController } from "../controllers";
import {
  isAdmMiddleware,
  validateSchemaMiddleware,
  verifyDvdExistsMiddleware,
  verifyTokenMiddleware,
} from "../middlewares";
import { validateMultiSchemaMiddleware } from "../middlewares/utils";
import { createDvdSchema } from "../schemas";
import { dvdService } from "../services";

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
  // verifyDvdExistsMiddleware,
  dvdController.createMany
);
dvdRoutes.get("", dvdController.retrieveAll);
dvdRoutes.post("/buy/:dvdld");

export default dvdRoutes;
