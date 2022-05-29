import { Request } from "express";
import { Dvd, Stock } from "../entities";
import { ICreateDvd } from "../interfaces";
import { dvdRepository } from "../repositories";

// class DvdService {
//   register = async ({ validated }: Request) => {
//     const { name, duration, quantity, price } = validated as ICreateDvd;

//     const newStock = await stockRepository.save({ quantity, price });
//     const newDvd = await dvdRepository.save({
//       name,
//       duration,
//       stock: newStock,
//     });

//     return newDvd;
//   };

//   retrieveAll = async () => {
//     const dvdList = await dvdRepository.find();
//     return dvdList;
//   };
// }

class DvdService {
  register = async ({ validated }: Request) => {
    const { name, duration, quantity, price } = validated as ICreateDvd;

    const newDvd = new Dvd();

    newDvd.name = name;
    newDvd.duration = duration;

    const stock = new Stock();
    stock.quantity = quantity;
    stock.price = price;

    newDvd.stock = stock;

    return await dvdRepository.save(newDvd);
  };

  registerMany = async ({ validated }: Request) => {
    const payloadList = validated as ICreateDvd[];

    const dvdList = payloadList.map((dvd: ICreateDvd) => {
      const newDvd = new Dvd();

      newDvd.name = dvd.name;
      newDvd.duration = dvd.duration;

      const stock = new Stock();
      stock.quantity = dvd.quantity;
      stock.price = dvd.price;

      newDvd.stock = stock;

      return newDvd;
    });

    return await dvdRepository.save(dvdList);
  };

  retrieveAll = async () => {
    const dvdList = await dvdRepository.find();
    return dvdList;
  };
}

export default new DvdService();
