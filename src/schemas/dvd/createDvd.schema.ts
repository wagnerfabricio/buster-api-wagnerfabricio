import * as yup from "yup";

export const createDvdSchema = yup.object().shape({
  name: yup.string().required(),
  duration: yup.string().required(),
  quantity: yup.number().positive().required(),
  price: yup.number().positive().required(),
});

export const serializeStockSchema = yup.object().shape({
  id: yup.string().uuid(),
  // quantity: yup.number(),
  price: yup.number().positive(),
});

export const serializeDvdSchema = yup.object().shape({
  id: yup.string().uuid(),
  name: yup.string().required(),
  duration: yup.string().required(),
  stock: yup.object().concat(serializeStockSchema),
});
