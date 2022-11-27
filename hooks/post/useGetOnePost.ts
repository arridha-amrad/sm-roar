import { TPost } from "@src/modules/post/post.types";
import { axiosInstance } from "@src/utils/axiosInterceptor";
import { useQuery } from "@tanstack/react-query";

export default function useGetOnePost({ postId }: { postId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["post", postId],
    enabled: typeof postId === "string" && postId !== "",
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ post: TPost }>(
        `/api/post/getOnePost?postId=${postId}`
      );
      return data.post;
    },
  });
  return {
    data,
    isLoading,
  };
}
