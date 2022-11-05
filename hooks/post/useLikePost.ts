import { Post } from '@prisma/client';
import { axiosInstance } from '@src/utils/axiosInterceptor';
import queryClient from '@src/utils/queryClient';
import { useMutation } from '@tanstack/react-query';

export default function useLikePost() {
  const { mutate } = useMutation({
    mutationFn: async (postId: number) => {
      return axiosInstance.post<{ message: string }>('/api/post/likePost', { postId });
    },
    onSuccess({ data }, variables, context) {
      const posts = queryClient.getQueryData<Post[]>(['posts']);
      if (!posts) return;
      const post = posts.find((post) => post.id === variables);
      if (!post) return;
      console.log('post : ', post);
    },
  });
  return {
    mutate,
  };
}
