import useGetPosts from '@src/hooks/post/useGetPosts';
import { Fragment } from 'react';
import Post from '../shared/Post';

const Posts = () => {
  const { data, isLoading } = useGetPosts();
  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <div className="">
      {data?.map((post, index) => (
        <Fragment key={post.id}>
          <Post post={post} isWithActionButtons={true} />
          {index + 1 < data.length && <div className="w-full h-[1px] bg-slate-700" />}
        </Fragment>
      ))}
    </div>
  );
};

export default Posts;
