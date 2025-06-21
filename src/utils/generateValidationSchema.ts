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

// Define separate schemas
export const signupSchema = Yup.object({
  username: Yup.string().trim().required("Username is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .trim()
    // .matches(/^\+?\d{10,15}$/, "Enter a valid phone number with country code")
    .required("Phone number is required"),
  otp: Yup.string().optional(),
});

export const loginSchema = Yup.object({
  phone: Yup.string()
    .trim()
    .matches(/^\+?\d{10,15}$/, "Enter a valid phone number with country code")
    .required("Phone number is required"),
  otp: Yup.string().optional(),
});

export const otpSchema = Yup.object({
  otp: Yup.string().trim().required("OTP is required"),
});
