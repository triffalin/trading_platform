import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import argon2 from 'argon2';
import nextCors from 'nextjs-cors';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await nextCors(req, res, {
    // Options
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200
  });

  if (req.method === 'POST') {
    const { email, password, referralCode } = req.body;

    try {
      const hashedPassword = await argon2.hash(password);

      // Define userData with a type that allows dynamic keys
      const userData = {
        email,
        password: hashedPassword,
        ...(referralCode && { referralCode })
      };
      const user = await prisma.user.create({ data: userData });
      res
        .status(200)
        .json({ status: 'success', message: 'User registered', user });
    } catch (error: any) {
      console.error('Request error', error);
      res
        .status(500)
        .json({
          error: 'Error creating user',
          errorMessage: error.message || 'Unknown error'
        });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
