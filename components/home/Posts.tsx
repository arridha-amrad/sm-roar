import useGetPosts from "@src/hooks/post/useGetPosts";
import { PostData } from "@src/modules/post/post.types";
import queryClient from "@src/utils/queryClient";
import Post from "../shared/Post";

const Posts = () => {
  const posts = queryClient.getQueryData<PostData[]>(["posts"]);
  const { data, isLoading } = useGetPosts();
  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <div className="px-4 space-y-8">
      {data?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
