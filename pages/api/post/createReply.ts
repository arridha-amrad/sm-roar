import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
import { verifyToken } from "@src/utils/token";
import { QUERY_AUTHOR_DATA } from "@src/modules/post/post.constants";
import { IPost, IPostWithParents } from "@src/modules/post/post.types";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { body, postId } = req.body;
  const token = req.headers.authorization;
  try {
    if (!token) {
      throw new Error("Un Authorized");
    }
    const { userId } = await verifyToken(token.split(" ")[1], "auth");
    const parentPost = await prisma.post.findFirst({ where: { id: postId } });
    if (!parentPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    const replyParents: IPost[] = [];
    const setParents = async (postId: string): Promise<void> => {
      const post = await prisma.post.findFirst({
        where: {
          id: postId,
        },
        include: {
          author: {
            select: QUERY_AUTHOR_DATA,
          },
          medias: true,
          _count: {
            select: {
              children: true,
              likes: true,
            },
          },
        },
      });

      if (!post) return;
      const isLiked = await prisma.like.findFirst({
        where: {
          postId: post?.id,
          userId,
        },
      });
      const postResult: IPost = { ...post, isLiked: !!isLiked };
      replyParents.push(postResult);
      if (post.parentId === null) return;
      return setParents(post.parentId);
    };

    if (parentPost.parentId) {
      await setParents(parentPost.parentId);
    }

    const newPost = await prisma.post.create({
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
      data: {
        parentId: postId,
        authorId: userId,
        body,
        createdAt: new Date(),
      },
    });
    const reply: IPostWithParents = {
      ...newPost,
      isLiked: false,
      parents: replyParents,
    };
    return res.status(201).json({ reply });
  } catch (error) {
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
