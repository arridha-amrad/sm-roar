import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@src/utils/prismaInstance';
import { QUERY_AUTHOR_DATA } from '@src/modules/post/post.constants';
import { verifyToken } from '@src/utils/token';
import { TParentHomePost } from '@src/modules/post/post.types';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('UnAuthorized');
    }
    const { userId } = await verifyToken(token.split(' ')[1], 'auth');
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            children: true,
            likes: true,
          },
        },
        medias: true,
        author: {
          select: QUERY_AUTHOR_DATA,
        },
      },
    });
    const myPosts = [] as typeof posts &
      { isLiked: boolean; parents: TParentHomePost }[];
    for (const post of posts) {
      let currentPost = {
        ...post,
        isLiked: false,
        parents: [] as TParentHomePost[],
      };
      const isLiked = await prisma.like.findFirst({
        where: {
          postId: post.id,
          userId,
        },
      });
      currentPost.isLiked = !!isLiked;
      const setParent = async (postId: string): Promise<void> => {
        const post = await prisma.post.findFirst({
          where: { id: postId },
          select: {
            id: true,
            parentId: true,
            author: {
              select: QUERY_AUTHOR_DATA,
            },
          },
        });
        if (!post) return;
        const index = currentPost.parents.findIndex(
          (parent) => parent.author.id === post.author.id
        );
        if (index < 0) {
          currentPost.parents.push(post);
        }
        if (post.parentId === null) return;
        return setParent(post.parentId);
      };
      if (currentPost.parentId) {
        await setParent(currentPost.parentId);
      }
      // const {parent, ...rest} = currentPost
      myPosts.push(currentPost);
    }
    return res.status(200).json({ posts: myPosts });
  } catch (error) {
    return res.status(500).send('Server Error');
  } finally {
    await prisma.$disconnect();
  }
}
