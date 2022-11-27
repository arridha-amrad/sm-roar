import {
  getPostCache,
  getPostsCache,
  setPostCache,
} from "@src/caches/PostCache";
import { TPost } from "@src/modules/post/post.types";
import { axiosInstance } from "@src/utils/axiosInterceptor";
import queryClient from "@src/utils/queryClient";
import { useMutation } from "@tanstack/react-query";

export interface ICreateCommentDTO {
  body: string;
  postId: string;
}

export default function useCreateComment() {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async (object: ICreateCommentDTO) => {
      const { data } = await axiosInstance.post<{ reply: TPost }>(
        "/api/post/createReply",
        object
      );
      return data.reply;
    },
    onSuccess(data, variables, _) {
      console.log("new reply : ", data);

      const { postId } = variables;
      const posts = getPostsCache();
      let post = getPostCache({ postId });
      if (post) {
        setPostCache({
          postId,
          data: { ...post, children: [data, ...post.children] },
        });
      }
      if (posts) {
        const index = posts.findIndex((post) => post.id === postId);
        posts[index].children.push(data);
        queryClient.setQueryData(["posts"], posts);
      }
    },
  });
  return {
    mutate,
    isLoading,
    isSuccess,
  };
}
