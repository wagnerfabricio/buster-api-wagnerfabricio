import { Request, Response } from "express";
import { User } from "../entities";
import { userRepository } from "../repositories";

export class UserController {
  create = async (req: Request, res: Response): Promise<Response> => {
    const newUser = await userRepository.register(req);
    return res.status(200).json(newUser);
  };
}

export default new UserController();
