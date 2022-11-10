import { PostLike, PostMedia } from '@prisma/client';
import { IAuthor, PostData, TReplies } from '@src/modules/post/post.types';
import { axiosInstance } from '@src/utils/axiosInterceptor';
import { useQuery } from '@tanstack/react-query';

type Result = PostData & {
  PostMedia: PostMedia[];
  author: IAuthor;
  Like: PostLike[];
  PostComment: TReplies;
};

export default function useGetOnePost({ postId }: { postId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['post', parseInt(postId)],
    enabled: postId !== '',
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ post: Result }>(`/api/post/getOnePost?postId=${postId}`);
      return data.post;
    },
  });
  return {
    data,
    isLoading,
  };
}
