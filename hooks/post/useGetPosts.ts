import { PostData } from "@src/modules/post/post.types";
import queryClient from "@src/utils/queryClient";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetPosts() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get<{ posts: PostData[] }>(
        "/api/post/getPosts"
      );
      return data.posts;
    },
    onSuccess(data) {
      queryClient.setQueryData(["posts"], data);
    },
  });
  return {
    data: data,
    isLoading,
  };
}
