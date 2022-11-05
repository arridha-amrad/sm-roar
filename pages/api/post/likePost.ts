import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@src/utils/prismaInstance';
import { verifyToken } from '@src/utils/token';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.body;
  const token = req.headers.authorization;
  try {
    if (!token) {
      throw new Error('Un Authorized');
    }
    const { userId } = await verifyToken(token.split(' ')[1], 'auth');
    const likePost = await prisma.postLike.findFirst({
      where: {
        AND: [
          {
            postId,
            userId: parseInt(userId),
          },
        ],
      },
    });
    if (likePost) {
      await prisma.postLike.delete({
        where: {
          id: likePost.id,
        },
      });
    } else {
      await prisma.postLike.create({
        data: {
          postId: parseInt(postId),
          userId: parseInt(userId),
        },
      });
    }
    return res.status(200).json({ message: likePost ? 'dislike' : 'like' });
  } catch (err) {
    return res.status(500).send('Server error');
  } finally {
    await prisma.$disconnect();
  }
}
