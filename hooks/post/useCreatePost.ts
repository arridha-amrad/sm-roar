import { getPostsCache } from "@src/caches/PostCache";
import { TPost } from "@src/modules/post/post.types";
import { axiosInstance } from "@src/utils/axiosInterceptor";
import queryClient from "@src/utils/queryClient";
import { useMutation } from "@tanstack/react-query";

interface ICreatePostDTO {
  body: string;
}

export default function useCreatePost() {
  const { mutate, isSuccess, isLoading } = useMutation({
    mutationFn: async (data: ICreatePostDTO) => {
      return axiosInstance.post<{ post: TPost }>("/api/post/createPost", data);
    },
    onSuccess({ data }) {
      const newPost = data.post;
      const posts = getPostsCache();
      if (posts) {
        queryClient.setQueryData(["posts"], [newPost, ...posts]);
      }
    },
  });

  return {
    mutate,
    isSuccess,
    isLoading,
  };
}
