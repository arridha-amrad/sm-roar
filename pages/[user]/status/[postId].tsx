import Comment from "@src/components/shared/Comment";
import Post from "@src/components/shared/Post";
import Sidebar from "@src/components/Sidebar/Sidebar";
import useGetOnePost from "@src/hooks/post/useGetOnePost";
import ArrowLeftIcon from "@src/icons/ArrowLeftIcon";
import Head from "next/head";
import { useRouter } from "next/router";

const PostDetail = () => {
  const router = useRouter();

  const postId = router.query.postId as string | undefined;

  const { data, isLoading } = useGetOnePost({ postId: postId ? postId : "" });

  return (
    <div className="flex max-w-[1200px] min-h-[500px] w-full mx-auto z-0">
      <Head>
        <title>
          {data?.author.name} on Roarr : {data?.body}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Sidebar />
      <div className="flex flex-[2] ">
        <div className="flex-[3]">
          <div className="flex h-16 px-4 item-center">
            <button onClick={() => router.back()}>
              <ArrowLeftIcon />
            </button>
            <h1 className="h-12 px-4 mt-4 text-xl font-semibold">Roarr</h1>
          </div>
          {isLoading ? (
            <p>loading...</p>
          ) : (
            <div className="pb-4">
              {data ? (
                <div>
                  <Post isWithActionButtons={true} post={data} />
                  {data.PostComment.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
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
