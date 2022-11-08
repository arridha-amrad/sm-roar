import { PostData } from '@src/modules/post/post.types';
import { axiosInstance } from '@src/utils/axiosInterceptor';
import queryClient from '@src/utils/queryClient';
import { useMutation } from '@tanstack/react-query';

interface ICreatePostDTO {
  body: string;
}

export default function useCreatePost() {
  const { mutate } = useMutation({
    mutationFn: async (data: ICreatePostDTO) => {
      return axiosInstance.post<{ post: PostData }>('/api/post/createPost', data);
    },
    onSuccess({ data }) {
      const newPost = data.post;
      const posts = queryClient.getQueryData<PostData[]>(['posts']);
      if (posts) {
        queryClient.setQueryData(['posts'], [newPost, ...posts]);
      }
    },
  });

  return {
    mutate,
  };
}
