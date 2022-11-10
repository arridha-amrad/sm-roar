import { PostData } from '@src/modules/post/post.types';
import queryClient from '@src/utils/queryClient';

export const setPostsCache = ({ data }: { data: PostData[] }) => {
  queryClient.setQueryData(['posts'], data);
};
export const getPostsCache = () => queryClient.getQueryData<PostData[]>(['posts']);

export const setPostCache = ({ postId, data }: { postId: number; data: PostData }) => {
  queryClient.setQueryData(['post', postId], data);
};
export const getPostCache = ({ postId }: { postId: number }) => {
  return queryClient.getQueryData<PostData>(['post', postId]);
};
