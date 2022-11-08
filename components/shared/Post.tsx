import { PostData } from "@src/modules/post/post.types";
import { FC, useMemo } from "react";
import Avatar from "../Avatar";
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
    const oneMinuteMilliSeconds = 1000 * 60;
    const oneHourMilliSeconds = 1000 * 60 * 60;
    const OneDayInMilliSeconds = 1000 * 60 * 60 * 24;

    const postTime = new Date(post.createdAt).getTime();
    const currTime = new Date().getTime();
    const timeDifferentInMilliSeconds = currTime - postTime;
    if (timeDifferentInMilliSeconds < OneDayInMilliSeconds) {
      if (timeDifferentInMilliSeconds < oneMinuteMilliSeconds) {
        const result = Math.ceil(timeDifferentInMilliSeconds / 1000);
        return `${result.toString()}s`;
      } else if (
        timeDifferentInMilliSeconds >= oneMinuteMilliSeconds &&
        timeDifferentInMilliSeconds < oneHourMilliSeconds
      ) {
        const result = Math.ceil(
          timeDifferentInMilliSeconds / oneMinuteMilliSeconds
        );
        return `${result.toString()}m`;
      } else {
        const result = Math.ceil(
          timeDifferentInMilliSeconds / oneHourMilliSeconds
        );
        return `${result.toString()}h`;
      }
    } else {
      return Intl.DateTimeFormat("en-US").format(new Date(post.createdAt));
    }
  }, []);

  return (
    <div className="flex items-start gap-4 -z-10">
      <Avatar url={post.author.imageURL} />
      <div className="flex-1">
        <div>
          <h1 className="text-sm font-bold">
            {post.author.name}
            <span className="mx-2 font-light dark:text-slate-400">
              @{post.author.username} <span className="">· {time}</span>
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
