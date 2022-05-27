import { Router } from "express";
import { userController } from "../controllers";
import { createUserSchema, loginUserSchema } from "../schemas";
import { validadeSchemaMiddleware } from "../middlewares";

const userRoutes = Router();

userRoutes.post(
  "/register",
  validadeSchemaMiddleware(createUserSchema),
  userController.create
);
userRoutes.post("/login", validadeSchemaMiddleware(loginUserSchema), userController.login);

export default userRoutes;
