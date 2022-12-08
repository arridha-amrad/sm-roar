import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
import { verifyToken } from "@src/utils/token";
import { POST_INCLUDED_DATA } from "@src/modules/post/post.constants";
import { IPostWithParents } from "@src/modules/post/post.types";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { body } = req.body;
  const token = req.headers.authorization;
  console.log("token : ", token);

  try {
    if (!token) {
      throw new Error("UnAuthorized");
    }
    const { userId } = await verifyToken(token.split(" ")[1], "auth");
    const newPost = await prisma.post.create({
      include: POST_INCLUDED_DATA,
      data: {
        authorId: userId,
        body,
      },
    });

    const post: IPostWithParents = { ...newPost, isLiked: false, parents: [] };

    return res.status(201).json({ post });
  } catch (err: any) {
    console.log("err", err);
    if (err["cause"] === "jwt expired") {
      return res.status(401).send("jwt expired");
    }
    return res.status(500).send("Server error");
  } finally {
    await prisma?.$disconnect();
  }
}
