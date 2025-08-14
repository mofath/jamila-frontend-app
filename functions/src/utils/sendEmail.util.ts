import nodemailer from "nodemailer";

interface SendEmailParams {
  from: string;
  to: string
  subject: string;
  html: string;
}

export const sendEmail = async ({ from, to, subject, html}: SendEmailParams) => {
  const { MAIL_USER, MAIL_PASS } = process.env;

  if (!MAIL_USER || !MAIL_PASS) {
    throw new Error("Missing MAIL_USER or MAIL_PASS in environment variables");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
};
