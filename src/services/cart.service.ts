import { Cart, CartDvd } from "../entities";
import { AppError } from "../errors";
import {
  cartDvdRepository,
  cartRepository,
  dvdRepository,
  userRepository,
} from "../repositories";

class CartService {
  verifyUserCart = async (userId: string) => {
    const userCart = await cartRepository.findOne({
      where: { user: { id: userId } },
    });

    return userCart;
  };

  verifyDvdOnCart = async (dvdId: string, cartId: string) => {
    const userCart = await cartRepository.findOneBy({ id: cartId });

    const dvdOnCart = userCart.dvds.find((cartDvd) => cartDvd.dvd.id === dvdId);

    return dvdOnCart;
  };

  buyProduct = async (userId: string, dvdId: string, dvdQuantity: number) => {
    const userCart = await this.verifyUserCart(userId);

    const newCart = new Cart();

    if (userCart) {
      newCart.id = userCart.id;
      newCart.dvds = userCart.dvds;
    }

    const dvdToAdd = await dvdRepository.findOneBy({ id: dvdId });

    if (!dvdToAdd) {
      throw new AppError("dvd not found", 404);
    }

    if (dvdToAdd.stock.quantity < dvdQuantity) {
      throw new AppError(
        `current stock: ${dvdToAdd.stock.quantity}, received demand ${dvdQuantity}`,
        422
      );
    }

    newCart.user = await userRepository.findOne({ id: userId });

    const dvdOnCart =
      userCart && (await this.verifyDvdOnCart(dvdId, userCart.id));

    if (dvdOnCart) {
      dvdOnCart.quantity += dvdQuantity;

      dvdOnCart.subtotal = dvdOnCart.quantity * dvdToAdd.stock.price;

      const filteredCartDvds = userCart.dvds.filter(
        (cartDvd) => cartDvd.id !== dvdOnCart.id
      );

      filteredCartDvds.push(dvdOnCart);

      newCart.total = filteredCartDvds.reduce(
        (acc, cartDvd) => cartDvd.subtotal + acc,
        0
      );

      newCart.dvds = filteredCartDvds;

      return await cartRepository.save(newCart);
    }

    const newCartDvd = new CartDvd();
    newCartDvd.quantity = dvdQuantity;
    newCartDvd.subtotal = dvdQuantity * dvdToAdd.stock.price;
    newCartDvd.dvd = dvdToAdd;

    newCart.dvds = newCart.dvds ? [...newCart.dvds, newCartDvd] : [newCartDvd];

    newCart.total = newCart.dvds.reduce(
      (acc, cartDvd) => cartDvd.subtotal + acc,
      0
    );

    await cartRepository.save(newCart);

    return await cartRepository.findOneBy({ id: newCart.id });
  };
}

export default new CartService();
