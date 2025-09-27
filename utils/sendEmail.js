const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: "gmail",
    port:465,
    secure:true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        
    },
});

const sendEmail = async ({ email, subject, message }) => {
    const mailOptions = {
        from: `"Password Reset" <${process.env.EMAIL_USER}>`, // must be the Gmail sender
        to: email,
        subject,
        html: message,
    }

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
}

module.exports = sendEmail;