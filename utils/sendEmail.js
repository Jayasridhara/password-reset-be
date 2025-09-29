 const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// Log for debugging (remove in production)
console.log('SendGrid API Key:', process.env.SENDGRID_API_KEY ? 'Key loaded' : 'Key missing');
console.log('Sender Email:', process.env.EMAIL_USER);

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ email, subject, message }) => {
  try {
    const msg = {
      to: email, // Recipient email
      from: process.env.EMAIL_USER, // Must be a verified sender in SendGrid
      subject: subject || 'No Subject', // Fallback for missing subject
      html: message || '<p>No message provided</p>', // Fallback for empty message
    };

    console.log('Mail Options:', JSON.stringify(msg, null, 2));
    const info = await sgMail.send(msg);
    console.log('Email sent:', {
      statusCode: info[0].statusCode,
      messageId: info[0].headers['x-message-id'],
    });
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error('SendGrid response:', JSON.stringify(error.response.body, null, 2));
    }
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendEmail;

