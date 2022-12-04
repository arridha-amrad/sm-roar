import { IPostWithParents } from "@src/modules/post/post.types";
import queryClient from "@src/utils/queryClient";

export const setHomePosts = ({ data }: { data: IPostWithParents[] }) => {
  queryClient.setQueryData(["posts"], data);
};

export const getHomePosts = () =>
  queryClient.getQueryData<IPostWithParents[]>(["posts"]);

// export const setPostDetail = ({
//   postId,
//   data,
// }: {
//   postId: string;
//   data: IPost;
// }) => {
//   queryClient.setQueryData(["post", postId], data);
// };

// export const getPostDetail = ({ postId }: { postId: string }) => {
//   return queryClient.getQueryData<TPost>(["post", postId]);
// };
