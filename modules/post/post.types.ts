import { Post, PostLike, PostMedia, PostReplies } from '@prisma/client';

export type PostData = Post & {
  PostMedia: PostMedia[];
  PostComment: PostReplies[];
  author: {
    id: number;
    imageURL: string;
    name: string;
    username: string;
  };
  Like: PostLike[];
};
