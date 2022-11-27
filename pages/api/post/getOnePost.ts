import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
import { QUERY_AUTHOR_DATA } from "@src/modules/post/post.constants";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query;

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postId as string,
      },
      include: {
        author: {
          select: QUERY_AUTHOR_DATA,
        },
        likes: true,
        children: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            author: {
              select: QUERY_AUTHOR_DATA,
            },
          },
        },
        medias: true,
        parent: true,
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
