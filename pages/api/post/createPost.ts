import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@src/utils/prismaInstance';
import { verifyToken } from '@src/utils/token';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { body } = req.body;
  const token = req.headers.authorization;

  try {
    if (!token) {
      throw new Error('UnAuthorized');
    }
    const { userId } = await verifyToken(token.split(' ')[1], 'auth');
    const newPost = await prisma.post.create({
      data: {
        body,
        createdAt: new Date(),
        userId: parseInt(userId),
      },
    });
    return res.status(201).json({ post: newPost });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server error');
  } finally {
    await prisma?.$disconnect();
  }
}
