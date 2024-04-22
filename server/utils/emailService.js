const nodemailer = require('nodemailer');

const sendEmail = async options => {
  if (!options) {
    throw new Error('Email options are required');
  }

  const { to, subject, text, html } = options;
  if (!to) {
    throw new Error('Email recipient is required');
  }

  if (!subject) {
    throw new Error('Email subject is required');
  }

  if (!text && !html) {
    throw new Error('Email text or html content is required');
  }

  // Create reusable transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const message = {
    from: '"Your Company Name" <info@qtrading.com>', // sender address
    to,
    subject,
    text,
    html
  };

  const info = await transporter.sendMail(message);
  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
