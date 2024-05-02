import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { sendResetPasswordEmail } from '../../../lib/mailer.js';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const resetToken = Math.random().toString(36).substr(2);
      const tokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now

      await prisma.user.update({
        where: { email },
        data: {
          resetToken,
          resetTokenExpiry: tokenExpiry
        }
      });

      await sendResetPasswordEmail(email, resetToken);

      res
        .status(200)
        .json({ message: 'Reset password link has been sent to your email.' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
