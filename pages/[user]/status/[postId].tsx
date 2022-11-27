import Navbar from '@src/components/shared/Navbar';
import Post from '@src/components/shared/Post';
import RecommendedUsers from '@src/components/shared/RecommendedUsers';
import Replies from '@src/components/shared/Replies';
import SearchRoarr from '@src/components/shared/SearchRoarr';
import TrendingTopics from '@src/components/shared/TrendingTopics';
import Sidebar from '@src/components/Sidebar/Sidebar';
import useGetOnePost from '@src/hooks/post/useGetOnePost';
import useMe from '@src/hooks/user/useMe';
import ArrowLeftIcon from '@src/icons/ArrowLeftIcon';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';

const PostDetail = () => {
  const router = useRouter();
  const postId = router.query.postId as string | undefined;
  const { data, isLoading } = useGetOnePost({ postId: postId ? postId : '' });

  const { isLoading: isLoadingUser } = useMe();

  if (isLoadingUser) {
    return (
      <div className="relative flex flex-col items-center justify-center w-screen h-screen ">
        <Image priority src="/logo.png" alt="logo" width={96} height={96} />
        <p className="relative">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex max-w-[1200px] min-h-[500px] w-full mx-auto z-0">
      <Head>
        <title>
          {isLoading
            ? 'loading'
            : data
            ? `${data.author.name} on roarr : ${data.body}`
            : ''}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Sidebar />
      <div className="flex flex-[2] ">
        <div className="flex-[3] border-r dark:border-slate-700">
          <Navbar
            label="Roarr"
            icon={
              <button onClick={() => router.back()}>
                <ArrowLeftIcon />
              </button>
            }
          />
          {isLoading ? (
            <p>loading...</p>
          ) : (
            <div className="pb-4">
              {data ? (
                <div>
                  <Post isWithActionButtons={true} post={data} />
                  <Replies replies={data.children} />
                </div>
              ) : (
                <p>post not found</p>
              )}
            </div>
          )}
        </div>
        <div className="flex-[2] px-4">
          <SearchRoarr />
          <div className="sticky top-[64px] space-y-3 mb-20">
            <TrendingTopics />
            <RecommendedUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
