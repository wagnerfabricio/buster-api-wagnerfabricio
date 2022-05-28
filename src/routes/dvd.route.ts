import { Router } from "express";
import { dvdController } from "../controllers";
import {
  isAdmMiddleware,
  validateSchemaMiddleware,
  verifyDvdExistsMiddleware,
  verifyTokenMiddleware,
} from "../middlewares";
import { createDvdSchema } from "../schemas";
import { dvdService } from "../services";

const dvdRoutes = Router();

dvdRoutes.post(
  "/register",
  verifyTokenMiddleware,
  isAdmMiddleware,
  validateSchemaMiddleware(createDvdSchema),
  verifyDvdExistsMiddleware,
  dvdController.create
);
dvdRoutes.get("", dvdController.retrieveAll);
dvdRoutes.post("/buy/:dvdld");

export default dvdRoutes;
