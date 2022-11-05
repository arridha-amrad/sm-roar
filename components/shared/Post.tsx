import { PostData } from "@src/modules/post/post.types";
import { FC, useMemo } from "react";
import AnaliticButton from "./AnaliticButton";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import ReRoarrButton from "./ReRoarrButton";
import RoarrOptionsButton from "./RoarrOptionsButton";
import ShareButton from "./SharedButton";

interface IProps {
  post: PostData;
}

const Post: FC<IProps> = ({ post }) => {
  const time = useMemo(() => {
    console.log("hour post : ", new Date(post.createdAt).getHours());
    console.log("minute post : ", new Date(post.createdAt).getMinutes());

    const postTime = new Date(post.createdAt).getTime();
    const currTime = new Date().getTime();
    const OneDayInMilliSeconds = 1000 * 60 * 60 * 24;
    const timeDifferent = currTime - postTime;
    let result = "";
    if (timeDifferent < OneDayInMilliSeconds) {
      console.log(timeDifferent);
    } else {
      return Intl.DateTimeFormat("en-US").format(new Date(post.createdAt));
    }
  }, []);
  console.log("time : ", time);

  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-yellow-600 rounded-full"></div>
      <div className="flex-1">
        <div>
          <h1 className="text-sm font-bold">
            {post.author.name}
            <span className="mx-2 font-light dark:text-slate-400">
              @{post.author.username} <span className="">· 2h</span>
            </span>
          </h1>
          <p className="font-light">{post.body}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <CommentButton />
          <ReRoarrButton />
          <LikeButton post={post} />
          <ShareButton />
          <AnaliticButton />
        </div>
      </div>
      <RoarrOptionsButton />
    </div>
  );
};

export default Post;
