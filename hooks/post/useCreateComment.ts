import { getHomePosts, setHomePosts } from '@src/caches/PostCache';
import { TPost } from '@src/modules/post/post.types';
import { axiosInstance } from '@src/utils/axiosInterceptor';
import { useMutation } from '@tanstack/react-query';

export interface ICreateCommentDTO {
  body: string;
  postId: string;
}

export default function useCreateComment() {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async (object: ICreateCommentDTO) => {
      const { data } = await axiosInstance.post<{ reply: TPost }>(
        '/api/post/createReply',
        object
      );
      return data.reply;
    },
    onSuccess(data, variables, _) {
      const { postId } = variables;
      const posts = getHomePosts();
      // let post = getPostDe({ postId });
      // if (post) {
      // setPostCache({
      //   postId,
      //   data: { ...post, children: [data, ...post.children] },
      // });
      // }
      if (posts) {
        const index = posts.findIndex((post) => post.id === postId);
        posts[index]._count.children += 1;
        setHomePosts({ data: posts });
      }
    },
  });
  return {
    mutate,
    isLoading,
    isSuccess,
  };
}
