import useGetPosts from '@src/hooks/post/useGetPosts';
import Post from '../shared/Post';

const Posts = () => {
  const { data, isLoading } = useGetPosts();
  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <div>
      {data?.map((post) => (
        <Post key={post.id} post={post} isWithActionButtons={true} />
      ))}
    </div>
  );
};

export default Posts;
