import { Express } from "express";
import userRoutes from "./user.route";
import dvdRoutes from "./dvd.route";
import cartRoutes from "./cart.route";

const appRoutes = (app: Express) => {
  app.use("/api/users", userRoutes);
  app.use("/api/dvds", dvdRoutes);
  app.use("/api/carts", cartRoutes);
};

export default appRoutes;
