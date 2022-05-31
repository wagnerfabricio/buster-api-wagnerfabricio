import { Request, Response } from "express";
import { orderService } from "../services";

class OrderController {
  create = async (req: Request, res: Response) => {
    const newOrder = await orderService.create(req.decodedUser);
    res.send(newOrder);
  };
}

export default new OrderController();
