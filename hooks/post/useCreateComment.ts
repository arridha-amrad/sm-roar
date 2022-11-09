import { PostReplies } from '@prisma/client';
import { PostData } from '@src/modules/post/post.types';
import { axiosInstance } from '@src/utils/axiosInterceptor';
import queryClient from '@src/utils/queryClient';
import { useMutation } from '@tanstack/react-query';

export interface ICreateCommentDTO {
  body: string;
  postId: number;
}

export default function useCreateComment() {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async (object: ICreateCommentDTO) => {
      const { data } = await axiosInstance.post<{ comment: PostReplies }>('/api/post/createComment', object);
      return data.comment;
    },
    onSuccess(data, variables, _) {
      const { postId } = variables;
      const posts = queryClient.getQueryData<PostData[]>(['posts']);
      if (posts) {
        const index = posts.findIndex((post) => post.id === postId);
        posts[index].PostComment.push(data);
        queryClient.setQueryData(['posts'], posts);
      }
    },
  });
  return {
    mutate,
    isLoading,
    isSuccess,
  };
}
