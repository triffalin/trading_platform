import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import argon2 from 'argon2';
import nextCors from 'nextjs-cors';

const prisma = new PrismaClient();

/**
 * Handler for the registration endpoint.
 * @param {NextApiRequest} req - The incoming request object.
 * @param {NextApiResponse} res - The outgoing response object.
 * @returns {Promise<void>}
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await nextCors(req, res, {
    methods: ['POST'],
    origin: process.env.ALLOWED_ORIGIN || '*',
    optionsSuccessStatus: 200
  });

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { email, password, referralCode } = req.body;

  try {
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id
    });

    const userData = {
      email,
      password: hashedPassword,
      ...(referralCode && { referralCode })
    };

    const user = await prisma.user.create({ data: userData });

    res.status(200).json({
      status: 'success',
      message: 'User registered',
      user
    });
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({
      error: 'Error creating user',
      errorMessage: (error as Error).message || 'Unknown error'
    });
  }
}
