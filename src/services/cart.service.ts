import { Cart, CartDvd, Dvd } from "../entities";
import { AppError } from "../errors";
import { cartRepository, dvdRepository, userRepository } from "../repositories";

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

  addNewDvdToCart = (userCart: Cart, dvdToAdd: Dvd, dvdQuantity: number) => {
    const newCartDvd = new CartDvd();
    newCartDvd.quantity = dvdQuantity;
    newCartDvd.subtotal = dvdQuantity * dvdToAdd.stock.price;
    newCartDvd.dvd = dvdToAdd;

    userCart.dvds = userCart.dvds
      ? [...userCart.dvds, newCartDvd]
      : [newCartDvd];

    userCart.total = userCart.dvds.reduce(
      (acc, cartDvd) => cartDvd.subtotal + acc,
      0
    );
  };

  increaseDvdQuantity = async (
    userCart: Cart,
    dvdToAdd: Dvd,
    dvdOnCart: CartDvd,
    dvdQuantity: number
  ) => {
    dvdOnCart.quantity += dvdQuantity;

    if (dvdOnCart.quantity > dvdToAdd.stock.quantity) {
      throw new AppError(
        `current stock: ${
          dvdToAdd.stock.quantity
        }, received demand ${dvdQuantity}, already on cart ${
          dvdOnCart.quantity - dvdQuantity
        }, total: ${dvdOnCart.quantity}`,
        422
      );
    }

    dvdOnCart.subtotal = dvdOnCart.quantity * dvdToAdd.stock.price;

    const filteredCartDvds = userCart.dvds.filter(
      (cartDvd) => cartDvd.id !== dvdOnCart.id
    );

    filteredCartDvds.push(dvdOnCart);

    userCart.total = filteredCartDvds.reduce(
      (acc, cartDvd) => cartDvd.subtotal + acc,
      0
    );

    userCart.dvds = filteredCartDvds;

    return await cartRepository.save(userCart);
  };

  buyProduct = async (userId: string, dvdId: string, dvdQuantity: number) => {
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

    let userCart = await this.verifyUserCart(userId);

    const dvdOnCart =
      userCart && (await this.verifyDvdOnCart(dvdId, userCart.id));

    if (!userCart) {
      userCart = new Cart();
    }

    userCart.user = await userRepository.findOne({ id: userId });

    if (dvdOnCart) {
      return await this.increaseDvdQuantity(
        userCart,
        dvdToAdd,
        dvdOnCart,
        dvdQuantity
      );
    }

    this.addNewDvdToCart(userCart, dvdToAdd, dvdQuantity);

    await cartRepository.save(userCart);

    return await cartRepository.findOneBy({ id: userCart.id });
  };
}

export default new CartService();
