import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendResetPasswordEmail = async (to, token) => {
  const link = `${process.env.BASE_URL}/auth/forgot-password?token=${token}`;
  try {
    await transporter.sendMail({
      from: `"Qtrading" <${process.env.EMAIL_USERNAME}>`,
      to: to,
      subject: 'Reset Your Password - Qtrading',
      text: `To reset your password, please click on this link: ${link}`,
      html: `<b>To reset your password, please click on this link:</b> <a href="${link}">${link}</a>` // HTML body
    });
  } catch (error) {
    console.error('Error sending reset password email:', error);
    throw new Error('Failed to send reset password email.');
  }
};
