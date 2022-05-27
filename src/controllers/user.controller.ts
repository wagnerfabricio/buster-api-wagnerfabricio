import { Request, Response } from "express";
import { User } from "../entities";
import { userRepository } from "../repositories";
import { userService } from "../services";

export class UserController {
  create = async (req: Request, res: Response): Promise<Response> => {
    const newUser = await userService.register(req);
    return res.status(200).json(newUser);
  };
  login = async (req: Request, res: Response): Promise<Response> => {
    const token = await userService.login(req);
    return res.status(200).json({ token });
  };
}

export default new UserController();
