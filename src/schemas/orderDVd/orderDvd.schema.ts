import * as yup from "yup";
import { serializeDvdSchema } from "../dvd/createDvd.schema";

export const orderDvdSchema = yup.object().shape({
    id: yup.string().uuid().required(),
    subtotal: yup.number().required(),
    quantity: yup.number().required(),
    dvd: yup.object().concat(serializeDvdSchema)
})