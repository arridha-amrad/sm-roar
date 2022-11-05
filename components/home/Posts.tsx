import useGetPosts from '@src/hooks/post/useGetPosts';
import Post from '../shared/Post';

const Posts = () => {
  const { data, isLoading } = useGetPosts();
  console.log('data : ', data);

  if (isLoading && !data) {
    return <p>loading...</p>;
  }
  return (
    <div className="px-4">
      {JSON.stringify(data)}
      {data?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
