import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
import { verifyToken } from "@src/utils/token";
import { PostLike } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.body;
  const token = req.headers.authorization;
  try {
    if (!token) {
      throw new Error("Un Authorized");
    }
    const { userId } = await verifyToken(token.split(" ")[1], "auth");
    let likePost: PostLike | null;
    let message: string;
    likePost = await prisma.postLike.findFirst({
      where: {
        postId,
        userId: parseInt(userId),
      },
    });
    if (likePost) {
      message = "dislike";
      await prisma.postLike.delete({
        where: {
          id: likePost.id,
        },
      });
    } else {
      message = "like";
      likePost = await prisma.postLike.create({
        data: {
          postId: parseInt(postId),
          userId: parseInt(userId),
        },
      });
    }
    return res.status(200).json({ message, likePost });
  } catch (err) {
    return res.status(500).send("Server error");
  } finally {
    await prisma.$disconnect();
  }
}
