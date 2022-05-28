import { AppDataSource } from "../data-source";
import { Dvd } from "../entities";

const dvdRepository = AppDataSource.getRepository(Dvd);

export default dvdRepository;
