import { Router } from "express";
import { orderController } from "../controllers";
import { verifyTokenMiddleware } from "../middlewares";

const cartRoutes = Router();

cartRoutes.put("/pay", verifyTokenMiddleware, orderController.create);

export default cartRoutes;
