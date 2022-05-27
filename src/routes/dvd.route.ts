import { Router } from "express";

const dvdRoutes = Router();

dvdRoutes.post("/register");
dvdRoutes.get("");
dvdRoutes.post("/bui/:dvdld");

export default dvdRoutes;
