import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
import { POST_INCLUDED_DATA } from "@src/modules/post/post.constants";
import { verifyToken } from "@src/utils/token";
import { IPostWithParents } from "@src/modules/post/post.types";
import { getPostParents } from "@src/modules/post/post.utils";

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
      include: POST_INCLUDED_DATA,
    });
    const myPosts: IPostWithParents[] = [];
    for (const post of posts) {
      let currentPost: IPostWithParents = {
        ...post,
        isLiked: false,
        parents: [],
      };
      const isLiked = await prisma.like.findFirst({
        where: {
          postId: post.id,
          userId,
        },
      });
      currentPost.isLiked = !!isLiked;

      if (currentPost.parentId) {
        const postParents = await getPostParents(
          currentPost.parentId,
          userId,
          currentPost.parents
        );
        currentPost.parents = postParents;
      }
      myPosts.push(currentPost);
    }
    return res.status(200).json({ posts: myPosts });
  } catch (error) {
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
