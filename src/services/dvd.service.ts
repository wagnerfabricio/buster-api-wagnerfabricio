import { Request, Response } from "express";
import { Dvd, Stock } from "../entities";
import { ICreateDvd } from "../interfaces";
import { stockRepository, dvdRepository } from "../repositories";

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

    stock.dvd = newDvd;

    newDvd.stock = stock;

    return await dvdRepository.save(stock);
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

/* 
query: SELECT "User"."id" AS "User_id", "User"."name" AS "User_name", "User"."email" AS "User_email", "User"."isAdm" AS "User_isAdm" FROM "users" "User" WHERE ("User"."id" = $1) LIMIT 1 -- PARAMETERS: ["f0660fc2-d337-4558-85f6-f8c6cdad1c97"]
query: SELECT DISTINCT "distinctAlias"."Dvd_id" AS "ids_Dvd_id" FROM (SELECT "Dvd"."id" AS "Dvd_id", "Dvd"."name" AS "Dvd_name", "Dvd"."duration" AS "Dvd_duration", "Dvd"."stockId" AS "Dvd_stockId", "Dvd_stock"."id" AS "Dvd_stock_id", "Dvd_stock"."quantity" AS "Dvd_stock_quantity", "Dvd_stock"."price" AS "Dvd_stock_price" FROM "dvd" "Dvd" LEFT JOIN "stock" "Dvd_stock" ON "Dvd_stock"."id"="Dvd"."stockId" WHERE ("Dvd"."name" = $1)) "distinctAlias" ORDER BY "Dvd_id" ASC LIMIT 1 -- PARAMETERS: ["duro de matar"]
query: START TRANSACTION
query: INSERT INTO "stock"("id", "quantity", "price") VALUES (DEFAULT, $1, $2) RETURNING "id" -- PARAMETERS: [30,10.99]
query: INSERT INTO "dvd"("id", "name", "duration", "stockId") VALUES (DEFAULT, $1, $2, $3) RETURNING "id" -- PARAMETERS: ["duro de matar","2h12min","51a6830b-3640-4efa-998f-c1e36df0c003"]
query: COMMIT 
*/
