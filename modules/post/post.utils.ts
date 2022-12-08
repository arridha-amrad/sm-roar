import { IPost } from "./post.types";
import prisma from "@src/utils/prismaInstance";
import { POST_INCLUDED_DATA } from "./post.constants";

export const getPostParents = async (
  postId: string,
  userId: string,
  parents: IPost[]
): Promise<IPost[]> => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
    include: POST_INCLUDED_DATA,
  });
  if (!post) return parents;
  const isLiked = await prisma.like.findFirst({
    where: {
      postId: post.id,
      userId,
    },
  });
  const postResult: IPost = { ...post, isLiked: !!isLiked };
  parents.push(postResult);

  if (post.parentId === null) return parents;
  return getPostParents(post.parentId, userId, parents);
};
