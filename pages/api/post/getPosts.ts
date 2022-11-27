import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
import { QUERY_AUTHOR_DATA } from "@src/modules/post/post.constants";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        children: true,
        parent: true,
        medias: true,
        likes: true,
        author: {
          select: QUERY_AUTHOR_DATA,
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
