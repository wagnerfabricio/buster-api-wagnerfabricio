import { AppDataSource } from "../data-source";
import { CartDvd } from "../entities";

const cartDvdRepository = AppDataSource.getRepository(CartDvd);

export default cartDvdRepository;
