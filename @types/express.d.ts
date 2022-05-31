import { User } from "../src/entities";
import { ICreateDvd } from "../src/interfaces";

declare global {
  namespace Express {
    interface Request {
      validated: User | ICreateDvd | ICreateDvd[];
      userId: string;
      decodedUser: User;
    }
  }
}
