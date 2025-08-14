import { getEmailTemplate } from "./utils/getEmailTemplate.util";
import { sendEmail } from "./utils/sendEmail.util";
import * as functions from "firebase-functions";
import express, { Request, Response } from "express";
import cors from "cors";

// App configf
const app = express();

const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Define routes
app.get("/ping", async (req: Request, res: Response) => {
  return res.status(200).send("Hello world");
});

app.post("/send-email", async (req: Request, res: Response) => {
  const { type, payload } = req.body;
  const { MAIL_USER: jamilaEmail } = process.env;

  if (!type || !payload) {
    return res
      .status(400)
      .json({ message: "Missing required fields: from, type, or payload" });
  }

  try {
    const { from, subject, html, userOrderHtml } = getEmailTemplate(
      type,
      payload
    );
    const userEmail = payload?.user?.email || payload.email;

    await sendEmail({
      from: userEmail as string,
      to: jamilaEmail as string,
      subject,
      html,
    });

    if (type === "order") {
      await sendEmail({
        from: jamilaEmail as string,
        to: userEmail as string,
        subject: "New order from Jamila",
        html: userOrderHtml,
      });
    }
    return res
      .status(200)
      .json({ message: "Email sent!", payload, from, type });
  } catch (err) {
    console.error("Email send error:", err);
    return res
      .status(500)
      .json({ message: "Error sending email", error: err?.toString() });
  }
});

export const api = functions.https.onRequest(app);
