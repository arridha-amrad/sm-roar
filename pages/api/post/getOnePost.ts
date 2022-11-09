import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query;

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(postId as string),
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            imageURL: true,
          },
        },
        Like: true,
        PostComment: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                name: true,
                imageURL: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        PostMedia: true,
      },
    });
    return res.status(200).json({ post });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
