import { setHomePosts } from '@src/caches/PostCache';
import { THomePost } from '@src/modules/post/post.types';
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
      const { data } = await axiosInstance.get<{ posts: THomePost[] }>('/api/post/getPosts');
      return data.posts;
    },
    onSuccess(data) {
      setHomePosts({ data });
    },
    staleTime: 1000 * 60,
  });
  return {
    data: data,
    isLoading,
  };
}
