import { Post, Like, Media } from '@prisma/client';

export interface IPostCount {
  children: number;
  likes: number;
}

export type THomePost = Post & {
  author: IAuthor;
  medias: Media[];
  parent: {
    author: IAuthor
  } | null
  _count: IPostCount;
  isLiked: boolean
};

export type TReply = Post & {
  author: IAuthor;
};

export type TReplies = Post & {
  author: IAuthor;
  children: Post[];
  likes: Like[];
  medias: Media[];
  parent: Post | null;
};

export type TPost = Post & {
  author: IAuthor;
};

export interface IAuthor {
  name: string;
  id: string;
  username: string;
  imageURL: string;
}
