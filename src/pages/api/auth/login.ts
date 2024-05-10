import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import argon2 from 'argon2';
import { sign, Secret } from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET: Secret = process.env.JWT_SECRET!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h'
    });
    res
      .status(200)
      .json({ status: 'success', message: 'Logged in successfully', token });
  } catch (error: any) {
    console.error('Login error:', error);
    res
      .status(500)
      .json({
        error: 'Internal server error',
        errorMessage: error?.message || 'Unknown error'
      });
  }
}
