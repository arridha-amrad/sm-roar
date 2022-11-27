import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
import { verifyToken } from "@src/utils/token";
import { QUERY_AUTHOR_DATA } from "@src/modules/post/post.constants";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { body } = req.body;
  const token = req.headers.authorization;

  try {
    if (!token) {
      throw new Error("UnAuthorized");
    }
    const { userId } = await verifyToken(token.split(" ")[1], "auth");
    const newPost = await prisma.post.create({
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
        authorId: userId,
        body,
      },
    });

    return res.status(201).json({ post: newPost });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  } finally {
    await prisma?.$disconnect();
  }
}
