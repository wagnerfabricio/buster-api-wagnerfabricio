import { Cart, Order, User } from "../entities";
import { OrderDvd } from "../entities/orderDvd.entity";
import { AppError } from "../errors";
import {
  cartRepository,
  dvdRepository,
  orderRepository,
} from "../repositories";
import { serializeCreateOrderSchema } from "../schemas";

class OrderService {
  addCartDvdToOrder = async (userCart: Cart) => {
    const orderDvd = await Promise.all(
      userCart.dvds.map(async (cartDvd) => {
        const orderDvd = new OrderDvd();
        orderDvd.dvd = cartDvd.dvd;

        if (orderDvd.dvd.stock.quantity < cartDvd.quantity) {
          throw new AppError(
            `Not enough stock of ${orderDvd.dvd.name} to purchase, current stock: ${orderDvd.dvd.stock.quantity}, received demand: ${cartDvd.quantity}`,
            422
          );
        }

        orderDvd.dvd.stock.quantity -= cartDvd.quantity;

        await dvdRepository.save(orderDvd.dvd);

        orderDvd.quantity = cartDvd.quantity;
        orderDvd.subtotal = cartDvd.subtotal;
        return orderDvd;
      })
    );
    return orderDvd;
  };

  calcOrderTotal = (order: Order) =>
    order.dvds.reduce((acc, orderDvd) => orderDvd.subtotal + acc, 0);

  create = async (user: User) => {
    const userCart: Cart = await user.cart;

    if (!userCart) throw new AppError("User cart is empty", 422);

    const newOrder = new Order();
    newOrder.user = user;

    newOrder.dvds = await this.addCartDvdToOrder(userCart);

    newOrder.total = this.calcOrderTotal(newOrder);

    const savedOrder = await orderRepository.save(newOrder);

    cartRepository.delete({ id: userCart.id });

    return await serializeCreateOrderSchema.validate(savedOrder, {
      stripUnknown: true,
    });
  };
}

export default new OrderService();
