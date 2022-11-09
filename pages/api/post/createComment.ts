import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
import { verifyToken } from "@src/utils/token";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { body, postId } = req.body;
  const token = req.headers.authorization;
  try {
    if (!token) {
      throw new Error("Un Authorized");
    }
    const { userId } = await verifyToken(token.split(" ")[1], "auth");
    const newComment = await prisma.postReplies.create({
      data: {
        userId: parseInt(userId),
        body,
        postId,
        createdAt: new Date(),
      },
    });
    return res.status(200).json({ comment: newComment });
  } catch (error) {
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
