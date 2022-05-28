import * as yup from "yup";

export const createDvdSchema = yup.object().shape({
  name: yup.string().required(),
  duration: yup.string().required(),
  quantity: yup.number().positive().required(),
  price: yup.number().positive().required(),
});
