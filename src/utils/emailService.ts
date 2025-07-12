import emailjs from "@emailjs/browser";
import { emailJsConfig } from "../constants";

const templateMap: Record<string, string> = {
  contact: "template_5i8wddn",
  partner: "template_7cr2na6",
  order: "",
};

export const sendEmail = async (
  templateKey: keyof typeof templateMap,
  templateParams: Record<string, string>
) => {
  const templateId = templateMap[templateKey];

  if (!templateId) {
    throw new Error(`Template '${templateKey}' is not defined in templateMap`);
  }

  try {
    const response = await emailjs.send(
      emailJsConfig.serviceId,
      templateId,
      templateParams,
      emailJsConfig.publicKey
    );
    return response;
  } catch (error) {
    throw error;
  }
};
