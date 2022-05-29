import { Request, Response } from "express";
import { cartService } from "../services";

class CartController {
  buy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.decodedUser;
    const { dvdId } = req.params;
    const { quantity } = req.body;

    const newCartProduct = await cartService.buyProduct(id, dvdId, quantity);

    return res.status(201).json(newCartProduct);
  };
}

export default new CartController();
