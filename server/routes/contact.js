const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL, // your gmail
      pass: process.env.SMTP_PASS,  // app password
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.RECEIVER_EMAIL, // receiver email
    subject: `New Feedback from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Feedback sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error sending feedback', error });
  }
});

module.exports = router;
