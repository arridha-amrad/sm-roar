import { Post, PostLike, PostMedia, PostReplies } from "@prisma/client";
import { axiosInstance } from "@src/utils/axiosInterceptor";
import { useQuery } from "@tanstack/react-query";

export interface IAuthor {
  name: string;
  id: number;
  username: string;
  imageURL: string;
}

type Result = Post & {
  PostMedia: PostMedia[];
  author: IAuthor;
  Like: PostLike[];
  PostComment: (PostReplies & {
    author: IAuthor;
  })[];
};

export default function useGetOnePost({ postId }: { postId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["post", postId],
    enabled: postId !== "",
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ post: Result }>(
        `/api/post/getOnePost?postId=${postId}`
      );
      return data.post;
    },
  });
  return {
    data,
    isLoading,
  };
}
