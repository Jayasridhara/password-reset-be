const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure:false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        
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

module.exports = sendEmail;