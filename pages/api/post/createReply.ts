import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
import { verifyToken } from "@src/utils/token";
import { POST_INCLUDED_DATA } from "@src/modules/post/post.constants";
import { IPostWithParents } from "@src/modules/post/post.types";
import { getPostParents } from "@src/modules/post/post.utils";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { body, postId } = req.body;
  const token = req.headers.authorization;
  try {
    if (!token) {
      throw new Error("Un Authorized");
    }

    const { userId } = await verifyToken(token.split(" ")[1], "auth");

    const parentPost = await prisma.post.findFirst({ where: { id: postId } });

    if (!parentPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newPost = await prisma.post.create({
      include: POST_INCLUDED_DATA,
      data: {
        parentId: postId,
        authorId: userId,
        body,
        createdAt: new Date(),
      },
    });

    const parents = await getPostParents(postId, userId, []);

    const reply: IPostWithParents = {
      ...newPost,
      isLiked: false,
      parents,
    };
    return res.status(201).json({ reply });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
