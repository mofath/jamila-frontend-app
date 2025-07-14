const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Config values
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

// Create transport

const transporter = nodemailer.createTransport(
  isDev
    ? {
        host: "localhost",
        port: 1025,
        secure: false,
        tls: { rejectUnauthorized: false },
      }
    : {
        service: "gmail",
        auth: {
          user: gmailEmail,
          pass: gmailPassword,
        },
      }
);
// Email function
exports.sendEmail = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { to, subject, message } = req.body;

  const mailOptions = {
    from: gmailEmail,
    to,
    subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).send("Error sending email");
    }
    return res.status(200).send("Email sent: " + info.response);
  });
});
