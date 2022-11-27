import { Like } from "@prisma/client";
import {
  getPostCache,
  getPostsCache,
  setPostCache,
  setPostsCache,
} from "@src/caches/PostCache";
import { axiosInstance } from "@src/utils/axiosInterceptor";
import { useMutation } from "@tanstack/react-query";

export default function useLikePost() {
  const { mutate } = useMutation({
    mutationFn: async (postId: string) => {
      return axiosInstance.post<{ message: string; likePost: Like }>(
        "/api/post/likePost",
        {
          postId,
        }
      );
    },
    onSuccess({ data: { message, likePost } }, variable, _) {
      const posts = getPostsCache();
      const post = getPostCache({ postId: variable });
      if (post) {
        if (message === "like") {
          post.likes.push(likePost);
          setPostCache({ data: post, postId: variable });
        } else {
          const updatedLikes = post.likes.filter(
            (like) => like.userId !== likePost.userId
          );
          post.likes = updatedLikes;
          setPostCache({ data: post, postId: variable });
        }
      }
      if (posts) {
        const index = posts.findIndex((post) => post.id === variable);
        if (message === "like") {
          posts[index].likes.push(likePost);
          setPostsCache({ data: posts });
        } else {
          const likes = posts[index].likes;
          const updatedLikes = likes.filter(
            (like) => like.userId !== likePost.userId
          );
          posts[index].likes = updatedLikes;
          setPostsCache({ data: posts });
        }
      }
    },
  });
  return {
    mutate,
  };
}
