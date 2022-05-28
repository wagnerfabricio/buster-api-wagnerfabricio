import { Request, Response } from "express";
import { Dvd, Stock } from "../entities";
import { ICreateDvd } from "../interfaces";
import { stockRepository, dvdRepository } from "../repositories";

class DvdService {
  register = async ({ validated }: Request) => {
    const { name, duration, quantity, price } = validated as ICreateDvd;

    const newStock = await stockRepository.save({ quantity, price });
    const newDvd = await dvdRepository.save({
      name,
      duration,
      stock: newStock,
    });

    return newDvd;
  };

  retrieveAll = async () => {
    const dvdList = await dvdRepository.find();
    return dvdList;
  };
}

export default new DvdService();
