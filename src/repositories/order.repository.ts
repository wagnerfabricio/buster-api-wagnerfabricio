import { AppDataSource } from "../data-source";
import { Order } from "../entities";

const orderRepository = AppDataSource.getRepository(Order);

export default orderRepository;
