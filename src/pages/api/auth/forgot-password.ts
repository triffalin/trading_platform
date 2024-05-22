import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { randomBytes } from 'crypto';
import { sendResetPasswordEmail } from '@/lib/mailer';

const prisma = new PrismaClient();

/**
 * Handler for the forgot password endpoint.
 * @param {NextApiRequest} req - The incoming request object.
 * @param {NextApiResponse} res - The outgoing response object.
 * @returns {Promise<void>}
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const resetToken = randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

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
    return;
  } catch (error) {
    console.error('Forgot password error:', error);
    const errorMessage = (error as Error).message || 'Unknown error';
    res.status(500).json({ error: 'Internal server error', errorMessage });
    return;
  }
}
