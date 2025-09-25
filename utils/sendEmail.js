const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // STARTTLS
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false, // helps in dev if cert issue
        },
        });

        transporter.verify((error, success) => {
        if (error) {
            console.error("SMTP connection failed:", error);
        } else {
            console.log("SMTP server is ready to send messages");
        }
    });

    const mailOptions = {
        from: `Password Reset Service <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;