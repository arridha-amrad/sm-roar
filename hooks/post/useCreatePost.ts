import { getHomePosts, setHomePosts } from "@src/caches/PostCache";
import { THomePost } from "@src/modules/post/post.types";
import { axiosInstance } from "@src/utils/axiosInterceptor";
import { useMutation } from "@tanstack/react-query";

interface ICreatePostDTO {
  body: string;
}

export default function useCreatePost() {
  const { mutate, isSuccess, isLoading } = useMutation({
    mutationFn: async (data: ICreatePostDTO) => {
      return axiosInstance.post<{ post: THomePost }>("/api/post/createPost", data);
    },
    onSuccess({ data }) {
      const newPost = data.post;
      const posts = getHomePosts();
      if (posts) {
        setHomePosts({data: [newPost, ...posts]})
      }
    },
  });

  return {
    mutate,
    isSuccess,
    isLoading,
  };
}
