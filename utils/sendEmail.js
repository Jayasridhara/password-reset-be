    const nodemailer = require('nodemailer');
    const sgMail = require('@sendgrid/mail');
    require('dotenv').config();
    console.log("SendGrid API Key:", process.env.SENDGRID_API_KEY);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const transporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 465,
        secure: true,
        auth: {
          user: "apikey", // literally "apikey"
          pass: process.env.SENDGRID_API_KEY, // your SendGrid API key
        },
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000,
        socketTimeout: 10000,
        debug: true, // Enable debug logs
        logger: true // Log to console
      });
    const sendEmail = async ({ email, subject, message }) => {
      try {
          const mailOptions = {
            from: process.env.EMAIL_USER, // must be the Gmail sender
            to: email,
            subject,
            html: message,
        }
        console.log("hi hello;",mailOptions);
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return info;
      }
      catch (error) {
          console.error('Error sending email:', error);
          throw error; // Rethrow to handle in calling function
        } 
    }
  module.exports = sendEmail;

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

