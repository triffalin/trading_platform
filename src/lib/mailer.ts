import nodemailer from 'nodemailer';

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  host: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Sends a reset password email to the specified recipient.
 * @param to - The recipient's email address.
 * @param token - The reset password token.
 * @returns Promise<void>
 */
export const sendResetPasswordEmail = async (
  to: string,
  token: string
): Promise<void> => {
  const link = `${process.env.BASE_URL}/auth/forgot-password?token=${token}`;
  try {
    await transporter.sendMail({
      from: `"Qtrading" <${process.env.EMAIL_USERNAME}>`,
      to,
      subject: 'Reset Your Password - Qtrading',
      text: `To reset your password, please click on this link: ${link}`,
      html: `<b>To reset your password, please click on this link:</b> <a href="${link}">${link}</a>` // HTML body
    });
  } catch (error) {
    console.error('Error sending reset password email:', error);
    throw new Error('Failed to send reset password email.');
  }
};
