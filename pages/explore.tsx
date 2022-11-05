import Sidebar from '@src/components/shared/Sidebar';
import Head from 'next/head';

const Explorer = () => {
  return (
    <div className="flex max-w-[1200px] min-h-[500px] h-screen w-full mx-auto ">
      <Head>
        <title>Roarr - Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Sidebar />
      <div className="flex flex-[2]">
        <div className="flex-1 border">1</div>
        <div className="flex-1 border">2</div>
      </div>
    </div>
  );
};

export default Explorer;
