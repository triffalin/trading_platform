import nodemailer from 'nodemailer';

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

  const message = {
    from: '"Your Company Name" <info@qtrading.com>',
    to,
    subject,
    text,
    html
  };

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    pool: true,
    maxMessages: 10
  });

  try {
    await transporter.sendMail(message);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
