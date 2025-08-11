import * as Yup from "yup";

export type AllowedFields =
  | "username"
  | "email"
  | "phone"
  | "currentPassword"
  | "password"
  | "newPassword";

const e164PhoneRegex = /^\+[1-9]\d{9,14}$/;

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

export const signupWithSchema = Yup.object({
  username: Yup.string().trim().required("Username is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .trim()
    // .matches(
    //   e164PhoneRegex,
    //   "Enter a valid phone number in international format (e.g. +15551234567)"
    // )
    .required("Phone number is required"),
  otp: Yup.string().optional(),
});

export const loginWithPhoneSchema = Yup.object({
  phone: Yup.string()
    .trim()
    .matches(
      e164PhoneRegex,
      "Enter a valid phone number in international format (e.g. +15551234567)"
    )
    .required("Phone number is required"),
  otp: Yup.string().optional(),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const signupSchema = Yup.object().shape({
  username: Yup.string().min(3).required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export const otpSchema = Yup.object({
  otp: Yup.string().trim().required("OTP is required"),
});

export const PartnerInfoSchema = Yup.object({
  personal: Yup.object({
    firstName: Yup.string().trim().required("First name is required"),
    lastName: Yup.string().trim().required("Last name is required"),
    email: Yup.string()
      .trim()
      .email("Invalid email format")
      .required("Email is required"),
  }),

  currentAddress: Yup.object({
    country: Yup.string().required("Country is required"),
    city: Yup.string().trim().required("City is required"),
    phone: Yup.string().trim().required("Phone is required"),
  }),

  locationOfInterest: Yup.object({
    country: Yup.string().required("Country is required"),
    city: Yup.string().trim().required("City is required"),
    phone: Yup.string().trim().required("Phone is required"),
  }),

  netWorth: Yup.string().required("Net worth selection is required"),
  liquidCapital: Yup.string().required("Liquid capital selection is required"),

  hasBusinessExperience: Yup.string().default("Yes"),

  bio: Yup.string().required("Bio is required"),
});

export const contactUsSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  message: Yup.string().trim().required("Message is required"),
});
