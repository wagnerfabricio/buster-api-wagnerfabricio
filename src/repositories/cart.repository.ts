import { AppDataSource } from "../data-source";
import { Cart } from "../entities";

const cartRepository = AppDataSource.getRepository(Cart);

export default cartRepository;
