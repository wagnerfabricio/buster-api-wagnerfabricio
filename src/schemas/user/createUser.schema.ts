import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().lowercase().trim().required(),
  isAdmin: yup.boolean().default(false).optional(),
  password: yup.string().required(),
});

export const serializedCreateUserSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  isAdmin: yup.boolean().required(),
});
