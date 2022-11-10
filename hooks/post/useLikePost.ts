import { PostLike } from '@prisma/client';
import { getPostCache, getPostsCache, setPostCache, setPostsCache } from '@src/caches/PostCache';
import { axiosInstance } from '@src/utils/axiosInterceptor';
import { useMutation } from '@tanstack/react-query';

export default function useLikePost() {
  const { mutate } = useMutation({
    mutationFn: async (postId: number) => {
      return axiosInstance.post<{ message: string; likePost: PostLike }>('/api/post/likePost', {
        postId,
      });
    },
    onSuccess({ data: { message, likePost } }, variable, _) {
      const posts = getPostsCache();
      const post = getPostCache({ postId: variable });
      if (post) {
        if (message === 'like') {
          post.Like.push(likePost);
          setPostCache({ data: post, postId: variable });
        } else {
          const updatedLikes = post.Like.filter((like) => like.userId !== likePost.userId);
          post.Like = updatedLikes;
          setPostCache({ data: post, postId: variable });
        }
      }
      if (posts) {
        const index = posts.findIndex((post) => post.id === variable);
        if (message === 'like') {
          posts[index].Like.push(likePost);
          setPostsCache({ data: posts });
        } else {
          const likes = posts[index].Like;
          const updatedLikes = likes.filter((like) => like.userId !== likePost.userId);
          posts[index].Like = updatedLikes;
          setPostsCache({ data: posts });
        }
      }
    },
  });
  return {
    mutate,
  };
}
