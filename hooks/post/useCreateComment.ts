import { getHomePosts, setHomePosts } from "@src/caches/PostCache";
import { IPost, IPostWithParents } from "@src/modules/post/post.types";
import { axiosInstance } from "@src/utils/axiosInterceptor";
import { useMutation } from "@tanstack/react-query";

export interface ICreateCommentDTO {
  body: string;
  postId: string;
}

export default function useCreateComment() {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async (object: ICreateCommentDTO) => {
      const { data } = await axiosInstance.post<{ reply: IPostWithParents }>(
        "/api/post/createReply",
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
        const parents: IPost[] = [];
        data.parents.map((post) => {
          const parent = parents.find((p) => p.author.id === post.author.id);
          if (!parent) {
            parents.push(post);
          }
          return;
        });
        const postsCache = [
          {
            ...data,
            parents,
          },
          ...posts,
        ];
        setHomePosts({ data: postsCache });
      }
    },
  });
  return {
    mutate,
    isLoading,
    isSuccess,
  };
}
