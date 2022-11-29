import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
import { QUERY_AUTHOR_DATA } from "@src/modules/post/post.constants";
import { verifyToken } from "@src/utils/token";

export default async function (req: NextApiRequest, res: NextApiResponse) {

  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("UnAuthorized");
    }
    const { userId } = await verifyToken(token.split(" ")[1], "auth");
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            children: true,
            likes: true
          }
        },
        medias: true,
        author: {
          select: QUERY_AUTHOR_DATA,
        },
      },
    });
    const myPosts = []
    for(const post of posts) {
      let currentPost = {...post, isLiked: false}
      const isLiked = await prisma.like.findFirst({
        where: {
          postId: post.id,
          userId
        }
      })
      currentPost.isLiked = !!isLiked
      myPosts.push(currentPost)
    }
    return res.status(200).json({ posts: myPosts });
  } catch (error) {
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
