import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Like: true,
        PostMedia: true,
        author: {
          select: {
            imageURL: true,
            username: true,
            name: true,
          },
        },
      },
    });
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
