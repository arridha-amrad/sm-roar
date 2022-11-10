import { setPostsCache } from '@src/caches/PostCache';
import { PostData } from '@src/modules/post/post.types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetPosts() {
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await axios.get<{ posts: PostData[] }>('/api/post/getPosts');
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
