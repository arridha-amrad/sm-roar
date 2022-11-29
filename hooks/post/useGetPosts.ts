import { setPostsCache } from '@src/caches/PostCache';
import { IPost } from '@src/modules/post/post.types';
import queryClient from '@src/utils/queryClient';
import { useQuery } from '@tanstack/react-query';
import {Me} from "@src/hooks/user/useMe"
import { axiosInstance } from '@src/utils/axiosInterceptor';

export default function useGetPosts() {
  const loginUser = queryClient.getQueryData<Me>(['me']);
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    enabled: !!loginUser,
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ posts: IPost[] }>('/api/post/getPosts');
      return data.posts;
    },
    onSuccess(data) {
      setPostsCache({ data });
    },
    staleTime: 1000 * 60,
  });
  return {
    data: data,
    isLoading,
  };
}
