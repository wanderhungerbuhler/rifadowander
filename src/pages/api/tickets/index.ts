import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const data = await prisma?.ticket?.findMany({
    orderBy: {
      tickets: "asc"
    }
  });

  return res.status(200).json(data);
}
