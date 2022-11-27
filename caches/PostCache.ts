import { TPost } from "@src/modules/post/post.types";
import queryClient from "@src/utils/queryClient";

export const setPostsCache = ({ data }: { data: TPost[] }) => {
  queryClient.setQueryData(["posts"], data);
};
export const getPostsCache = () => queryClient.getQueryData<TPost[]>(["posts"]);

export const setPostCache = ({
  postId,
  data,
}: {
  postId: string;
  data: TPost;
}) => {
  queryClient.setQueryData(["post", postId], data);
};
export const getPostCache = ({ postId }: { postId: string }) => {
  return queryClient.getQueryData<TPost>(["post", postId]);
};
