import { PostLike } from "@prisma/client";
import { PostData } from "@src/modules/post/post.types";
import { axiosInstance } from "@src/utils/axiosInterceptor";
import queryClient from "@src/utils/queryClient";
import { useMutation } from "@tanstack/react-query";

export default function useLikePost() {
  const { mutate } = useMutation({
    mutationFn: async (postId: number) => {
      return axiosInstance.post<{ message: string; likePost: PostLike }>(
        "/api/post/likePost",
        {
          postId,
        }
      );
    },
    onSuccess({ data: { message, likePost } }, variables, context) {
      const posts = queryClient.getQueryData<PostData[]>(["posts"]);
      const post = queryClient.getQueryData<PostData>([
        "post",
        variables.toString(),
      ]);
      if (post) {
        if (message === "like") {
          post.Like.push(likePost);
          queryClient.setQueryData(["post", variables], post);
        } else {
          const updatedLikes = post.Like.filter(
            (like) => like.userId !== likePost.userId
          );
          post.Like = updatedLikes;
          queryClient.setQueryData(["post", variables.toString()], post);
        }
      }

      if (posts) {
        const index = posts.findIndex((post) => post.id === variables);
        if (message === "like") {
          posts[index].Like.push(likePost);
          queryClient.setQueryData(["posts"], posts);
        } else {
          const likes = posts[index].Like;
          const updatedLikes = likes.filter(
            (like) => like.userId !== likePost.userId
          );
          posts[index].Like = updatedLikes;
          queryClient.setQueryData(["posts"], posts);
        }
      }
    },
  });
  return {
    mutate,
  };
}
