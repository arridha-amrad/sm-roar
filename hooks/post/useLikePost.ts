import { Like } from '@prisma/client';
import { getHomePosts, setHomePosts } from '@src/caches/PostCache';
import { axiosInstance } from '@src/utils/axiosInterceptor';
import { useMutation } from '@tanstack/react-query';

export default function useLikePost() {
  const { mutate } = useMutation({
    mutationFn: async (postId: string) => {
      return axiosInstance.post<{ message: string; likePost: Like }>(
        '/api/post/likePost',
        {
          postId,
        }
      );
    },
    onSuccess({ data: { message, likePost } }, variable, _) {
      const posts = getHomePosts();
      //       const post = getPostCache({ postId: variable });
      //       if (post) {
      //         if (message === "like") {
      // setPostCache({postId: variable, data: {
      //   ...post
      // }})
      //         } else {
      //           const updatedLikes = post.likes.filter(
      //             (like) => like.userId !== likePost.userId
      //           );
      //           post.likes = updatedLikes;
      //           setPostCache({ data: post, postId: variable });
      //         }
      //       }
      if (posts) {
        const index = posts.findIndex((post) => post.id === variable);
        posts[index].isLiked = !posts[index].isLiked;
        if (message === 'like') {
          posts[index]._count.likes += 1;
          setHomePosts({ data: posts });
        } else {
          posts[index]._count.likes -= 1;
          setHomePosts({ data: posts });
        }
      }
    },
  });
  return {
    mutate,
  };
}
