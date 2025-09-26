const nodemailer = require('nodemailer');
const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Password Reset" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html: message,
  });
};

module.exports = sendEmail;