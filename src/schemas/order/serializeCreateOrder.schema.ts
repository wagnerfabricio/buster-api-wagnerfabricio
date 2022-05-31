import * as yup from "yup";
import { orderDvdSchema } from "../orderDVd/orderDvd.schema";
import { serializedCreateUserSchema } from "../user/createUser.schema";

export const serializeCreateOrderSchema = yup.object().shape({
  id: yup.string().uuid(),
  total: yup.number(),
  createdAt: yup.date(),
  paid: yup.boolean(),
  user: yup.object().concat(serializedCreateUserSchema),
  dvds: yup.array().of(orderDvdSchema),
});
