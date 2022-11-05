import useLogout from '@src/hooks/user/useLogout';
import useMe, { Me } from '@src/hooks/user/useMe';
import queryClient from '@src/utils/queryClient';
import Head from 'next/head';
import Sidebar from '@src/components/shared/Sidebar';
import CreatePostForm from '@src/components/shared/CreatePostForm';
import Posts from '@src/components/home/Posts';

export default function Home() {
  const { isSuccess } = useLogout();

  const data = queryClient.getQueryData<Me>(['me']);

  const { isLoading, data: user } = useMe(!data && !isSuccess);

  if (isLoading || !user) {
    return (
      <div className="w-screen h-screen m-auto">
        <p>Loading...</p>
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
