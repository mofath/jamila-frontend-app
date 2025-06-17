import * as Yup from "yup";

export type AllowedFields =
  | "username"
  | "email"
  | "phone"
  | "currentPassword"
  | "password"
  | "newPassword";


export const generateValidationSchema = (fields: AllowedFields[]) => {
  const schemaShape: Record<AllowedFields, Yup.AnySchema> = {
    username: Yup.string().min(3).required("Username is required"),
    email: Yup.string().email().required("Email is required"),
    phone: Yup.string().min(10).required("Phone is required"),
    password: Yup.string().min(6).required("Password is required"),
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string().min(6).required("New password is required"),
  };

  const shape: Record<string, Yup.AnySchema> = {};
  fields.forEach((field) => {
    shape[field] = schemaShape[field];
  });

  return Yup.object().shape(shape);
};