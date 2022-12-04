import { Post, Like, Media } from "@prisma/client";

export type IPost = Post & {
  author: IAuthor;
  medias: Media[];
  _count: IPostCount;
  isLiked: boolean;
};

export type IPostWithParents = IPost & {
  parents: IPost[];
};

export interface TParentHomePost {
  id: string;
  parentId: string | null;
  author: IAuthor;
}

export interface IPostCount {
  children: number;
  likes: number;
}

export type THomePost = Post & {
  author: IAuthor;
  medias: Media[];
  parents: TParentHomePost[];
  _count: IPostCount;
  isLiked: boolean;
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
  medias: Media[];
  children: Post[];
  likes: Like[];
  parent: Post | null;
};

export interface IAuthor {
  name: string;
  id: string;
  username: string;
  imageURL: string;
}
