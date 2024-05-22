import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import argon2 from 'argon2';
import { sign, Secret } from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;

/**
 * Handler for the login endpoint.
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

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const token = sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h'
    });

    res
      .status(200)
      .json({ status: 'success', message: 'Logged in successfully', token });
  } catch (error) {
    console.error('Login error:', error);
    const errorMessage = (error as Error).message || 'Unknown error';
    res.status(500).json({ error: 'Internal server error', errorMessage });
  }
}
