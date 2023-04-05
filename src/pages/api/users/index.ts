import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, cpf, email, whatsapp, tickets, status_payment } = req.body;

  const user = await prisma.users.upsert({
    where: { cpf },
    update: {
      name,
      email,
      cpf,
      whatsapp,
    },
    create: {
      name,
      cpf,
      email,
      whatsapp
    }
  });

  const userId = user?.id;

  const existTickets = await prisma.ticket.findMany({
    where: { id: { in: tickets } },
  });

  if (existTickets) {
    await prisma.ticket.updateMany({
      where: { id: { in: tickets } },
      data: {
        status_payment,
        usersId: userId,
      }
    });
  }

  return res.status(202).json({
    message: 'User was updated',
  });
}
