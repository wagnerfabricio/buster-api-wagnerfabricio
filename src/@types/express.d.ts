import { User } from "../entities";
import { ICreateDvd } from "../interfaces";

declare global {
  namespace Express {
    interface Request {
      validated: User | ICreateDvd;
      userId: string;
      decodedUser: User;
    }
  }
}
