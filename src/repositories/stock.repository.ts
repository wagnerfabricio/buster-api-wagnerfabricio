import { AppDataSource } from "../data-source";
import { Stock } from "../entities";

const stockRepository = AppDataSource.getRepository(Stock);

export default stockRepository;
