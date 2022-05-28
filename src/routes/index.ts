import { Express } from "express";
import userRoutes from "./user.route";
import dvdRoutes from "./dvd.route";
import orderRoutes from "./order.route";

const appRoutes = (app: Express) => {
  app.use("/api/users", userRoutes);
  app.use("/api/dvds", dvdRoutes);
  app.use("/api/order", orderRoutes);
};

export default appRoutes;
