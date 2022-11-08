import { PostData } from "@src/modules/post/post.types";
import timeSetter from "@src/utils/timeSetter";
import Link from "next/link";
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
  isWithActionButtons: boolean;
}

const Post: FC<IProps> = ({ post, isWithActionButtons }) => {
  const time = timeSetter({ post });

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
        {isWithActionButtons ? (
          <div className="flex items-center justify-between mt-3">
            <CommentButton post={post} />
            <ReRoarrButton />
            <LikeButton post={post} />
            <ShareButton />
            <AnaliticButton />
          </div>
        ) : (
          <div>
            <div className="my-4">
              <p className="text-sm dark:text-slate-600 text-slate-200">
                Replying to{" "}
                <Link href="/profile" className="text-blue-500 ">
                  @{post.author.username}
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
      {isWithActionButtons && <RoarrOptionsButton />}
    </div>
  );
};

export default Post;
