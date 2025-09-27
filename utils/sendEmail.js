const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

 const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
      user: "apikey", // literally "apikey"
      pass: process.env.SENDGRID_API_KEY, // your SendGrid API key
    },
  });
const sendEmail = async ({ email, subject, message }) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // must be the Gmail sender
        to: email,
        subject,
        html: message,
    }
    console.log("hi hello;",mailOptions);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
}


//  const sendEmail = async ({ email, subject, message }) => {
//     const msg = {
//     to:email,
//     from:process.env.EMAIL_USER, // Must be a verified sender in SendGrid
//     subject,
//     message
//   };

//   try {
//     await sgMail.send(msg);
   
//   } catch (error) {
//     console.error(error);
//     if (error.response) {
//       console.error(error.response.body);
//     }
    
//   }
//  }

module.exports = sendEmail;