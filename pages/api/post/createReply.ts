import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
import { verifyToken } from "@src/utils/token";
import { QUERY_AUTHOR_DATA } from "@src/modules/post/post.constants";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { body, postId } = req.body;
  const token = req.headers.authorization;
  try {
    if (!token) {
      throw new Error("Un Authorized");
    }
    const { userId } = await verifyToken(token.split(" ")[1], "auth");
    const post = await prisma.post.findFirst({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const reply = await prisma.post.create({
      include: {
        children: true,
        likes: true,
        medias: true,
        parent: true,
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
    return res.status(201).json({ reply });
  } catch (error) {
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
