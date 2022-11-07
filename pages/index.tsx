import useMe from '@src/hooks/user/useMe';
import Head from 'next/head';
import Sidebar from '@src/components/Sidebar/Sidebar';
import CreatePostForm from '@src/components/shared/CreatePostForm';
import Posts from '@src/components/home/Posts';
import Image from 'next/image';
import Logo from '@src/images/logo.png';

export default function Home() {
  const { isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="relative flex flex-col items-center justify-center w-screen h-screen ">
        <Image src={Logo} alt="logo" width={100} height={100} priority />
        <p className="relative">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex max-w-[1200px] min-h-[500px] h-screen w-full mx-auto ">
      <Head>
        <title>Roarr - Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Sidebar />
      <div className="flex flex-[2] ">
        <div className="border flex-[3] border-slate-700">
          <h1 className="h-12 px-4 mt-4 text-xl font-semibold">Home</h1>
          <div className="px-4">
            <CreatePostForm />
          </div>
          <hr className="my-4 border border-slate-700" />
          <Posts />
        </div>
        <div className="flex-[2] ">2</div>
      </div>
    </div>
  );
}
