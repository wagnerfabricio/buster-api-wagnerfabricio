import { Router } from "express";
import { userController } from "../controllers";
import { createUserSchema } from "../schemas";
import { validadeSchemaMiddleware } from "../middlewares";

const userRoutes = Router();

userRoutes.post(
  "/register",
  validadeSchemaMiddleware(createUserSchema),
  userController.create
);
userRoutes.post("/login");

export default userRoutes;
