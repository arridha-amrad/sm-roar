import { Post, Like, Media } from "@prisma/client";

export type TReplies = Post & {
  author: IAuthor;
  children: Post[];
  likes: Like[];
  medias: Media[];
  parent: Post | null;
};

export type TPost = Post & {
  author: IAuthor;
  children: TReplies[];
  likes: Like[];
  medias: Media[];
  parent: Post | null;
};

export interface IAuthor {
  name: string;
  id: number;
  username: string;
  imageURL: string;
}
