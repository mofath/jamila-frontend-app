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
  const { from, type, payload } = req.body;

  if (!from || !type || !payload) {
    return res
      .status(400)
      .json({ message: "Missing required fields: from, type, or payload" });
  }

  try {
    const { subject, html } = getEmailTemplate(type, payload);
    await sendEmail({ from, subject, html });
    return res.status(200).json({ message: "Email sent!" });
  } catch (err) {
    console.error("Email send error:", err);
    return res
      .status(500)
      .json({ message: "Error sending email", error: err?.toString() });
  }
});

export const api = functions.https.onRequest(app);
