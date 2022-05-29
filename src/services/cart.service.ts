import { Cart } from "../entities";
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
    const dvdList = userCart.dvds;
    const dvdOnCart = dvdList.find((dvd) => dvd.id === dvdId);
    return dvdOnCart;
  };

  buyProduct = async (userId: string, dvdId: string, dvdQuantity: number) => {
    const userCart = await this.verifyUserCart(userId);

    const newCart = new Cart();

    if (userCart) newCart.id = userCart.id;

    const dvdToAdd = await dvdRepository.findOneBy({ id: dvdId });

    newCart.user = await userRepository.findOne({ id: userId });

    const dvdOnCart =
      userCart && (await this.verifyDvdOnCart(dvdId, userCart.id));

    newCart.dvds = dvdOnCart
      ? [...userCart.dvds]
      : [...userCart.dvds, dvdToAdd];

    newCart.total = userCart
      ? userCart.total + dvdToAdd.stock.price * dvdQuantity
      : dvdToAdd.stock.price * dvdQuantity;

    return await cartRepository.save(newCart);
  };
}

export default new CartService();
