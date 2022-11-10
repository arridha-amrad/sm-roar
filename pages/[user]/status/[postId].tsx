import Navbar from '@src/components/shared/Navbar';
import Post from '@src/components/shared/Post';
import Replies from '@src/components/shared/Replies';
import Sidebar from '@src/components/Sidebar/Sidebar';
import useGetOnePost from '@src/hooks/post/useGetOnePost';
import ArrowLeftIcon from '@src/icons/ArrowLeftIcon';
import Head from 'next/head';
import { useRouter } from 'next/router';

const PostDetail = () => {
  const router = useRouter();

  const postId = router.query.postId as string | undefined;

  const { data, isLoading } = useGetOnePost({ postId: postId ? postId : '' });

  return (
    <div className="flex max-w-[1200px] min-h-[500px] w-full mx-auto z-0">
      <Head>
        <title>{isLoading ? 'loading' : data ? `${data.author.name} on roarr : ${data.body}` : ''}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Sidebar />
      <div className="flex flex-[2] ">
        <div className="flex-[3] border-r dark:border-slate-700">
          <Navbar label="Roarr" icon={<ArrowLeftIcon />} />
          {isLoading ? (
            <p>loading...</p>
          ) : (
            <div className="pb-4">
              {data ? (
                <div>
                  <Post isWithActionButtons={true} post={data} />
                  <Replies replies={data.PostComment} />
                </div>
              ) : (
                <p>post not found</p>
              )}
            </div>
          )}
        </div>
        <div className="flex-[2] ">2</div>
      </div>
    </div>
  );
};

export default PostDetail;
