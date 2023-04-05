import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  async function createRecords() {
    const recordsToCreate = [];

    for (let i = 1; i <= 200; i++) {
      recordsToCreate.push({
        id: `${i}`,
        tickets: i
      });
    }

    const createdRecords = await prisma?.ticket?.createMany({
      data: recordsToCreate,
    });

    console.log('Registros criados com sucesso:', createdRecords);
  }

  createRecords();
}
