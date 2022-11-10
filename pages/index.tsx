import useMe from '@src/hooks/user/useMe';
import Head from 'next/head';
import Sidebar from '@src/components/Sidebar/Sidebar';
import CreatePostForm from '@src/components/shared/CreatePostForm';
import Posts from '@src/components/home/Posts';
import Logo from '@src/images/logo.png';
import Navbar from '@src/components/shared/Navbar';

import SearchRoarr from '@src/components/shared/SearchRoarr';
import TrendingTopics from '@src/components/shared/TrendingTopics';
import RecommendedUsers from '@src/components/shared/RecommendedUsers';

export default function Home() {
  const { isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="relative flex flex-col items-center justify-center w-screen h-screen ">
        <img src={Logo.src} alt="logo" className="object-cover w-24 h-24" />
        <p className="relative">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex max-w-[1200px] w-full mx-auto z-0">
      <Head>
        <title>Roarr - Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Sidebar />
      <div className="flex flex-1">
        <div className="flex-[3] border-r border-slate-700">
          <Navbar label="Home" />
          <div className="px-4 pb-4">
            <CreatePostForm />
          </div>
          <hr className="border border-slate-700" />
          <Posts />
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
}
