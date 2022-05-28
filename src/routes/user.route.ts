import { Router } from "express";
import { userController } from "../controllers";
import { createUserSchema, loginUserSchema } from "../schemas";
import {
  createAdminMiddleware,
  validateSchemaMiddleware,
  verifyUserExistsMiddleware,
} from "../middlewares";

const userRoutes = Router();

userRoutes.post(
  "/register",
  validateSchemaMiddleware(createUserSchema),
  verifyUserExistsMiddleware,
  createAdminMiddleware,
  userController.create
);
userRoutes.post(
  "/login",
  validateSchemaMiddleware(loginUserSchema),
  userController.login
);

export default userRoutes;
