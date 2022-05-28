import { Request, Response } from "express";
import { dvdService } from "../services";

export class dvdController {
  create = async (req: Request, res: Response): Promise<Response> => {
    const newDvd = await dvdService.register(req);
    return res.status(201).json(newDvd);
  };

  retrieveAll = async (_: Request, res: Response): Promise<Response> => {
    const dvdList = await dvdService.retrieveAll();
    return res.status(200).json(dvdList);
  };
}

export default new dvdController();
