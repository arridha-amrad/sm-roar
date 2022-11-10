import { Post, PostLike, PostMedia, PostReplies } from '@prisma/client';

export type PostData = Post & {
  PostMedia: PostMedia[];
  PostComment: TReplies[];
  author: {
    id: number;
    imageURL: string;
    name: string;
    username: string;
  };
  Like: PostLike[];
};

export interface IAuthor {
  name: string;
  id: number;
  username: string;
  imageURL: string;
}

export type TReplies = PostReplies & {
  author: IAuthor;
};
