import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
import { verifyToken } from "@src/utils/token";
import { Like } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.body;
  const token = req.headers.authorization;
  try {
    if (!token) {
      throw new Error("Un Authorized");
    }
    const { userId } = await verifyToken(token.split(" ")[1], "auth");
    let likePost: Like | null;
    let message: string;
    likePost = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });
    if (likePost) {
      message = "dislike";
      await prisma.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });
    } else {
      message = "like";
      likePost = await prisma.like.create({
        data: {
          postId,
          userId,
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
