import { Post, PostLike, PostMedia } from '@prisma/client';

export type PostData = Post & {
  PostMedia: PostMedia[];
  author: {
    id: number;
    imageURL: string;
    name: string;
    username: string;
  };
  Like: PostLike[];
};
