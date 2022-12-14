import { IPostWithParents } from "@src/modules/post/post.types";
import timeSetter from "@src/utils/timeSetter";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import Avatar from "./Avatar";
import AnalyticButton from "./AnalyticButton";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import ReRoarrButton from "./ReRoarrButton";
import RoarrOptionsButton from "./RoarrOptionsButton";
import ShareButton from "./SharedButton";

interface IProps {
  post: IPostWithParents;
  isWithActionButtons: boolean;
}

const Post: FC<IProps> = ({ post, isWithActionButtons }) => {
  const time = timeSetter(post.createdAt.toString());

  const router = useRouter();

  const navigate = () => {
    router.push(`/${post.author.username}/status/${post.id}`);
  };

  const parents = post.parents.filter(
    (post, index, array) =>
      index === array.findIndex((p) => p.author.id === post.author.id)
  );

  return (
    <div
      onClick={navigate}
      className="flex items-start gap-4 p-4 cursor-pointer"
    >
      <Avatar url={post.author.imageURL} />
      <div className="flex-1">
        <div>
          <h1 className="text-sm font-bold">
            {post.author.name}
            <span className="mx-2 font-light dark:text-slate-400">
              @{post.author.username} <span className="">· {time}</span>
            </span>
          </h1>

          {post.parents.length > 0 && (
            <div className="flex flex-wrap text-sm text-slate-400">
              Replying to <span className="pr-1" />
              {parents.map((parent, index) => (
                <div key={parent.author.id} className="text-yellow-600">
                  @{parent.author.username}
                  {post.parents.length > 1 &&
                  index === post.parents.length - 2 ? (
                    <span className="px-1">&</span>
                  ) : index + 1 === post.parents.length ? (
                    <span className="px-1"></span>
                  ) : (
                    <span className="pr-1">,</span>
                  )}
                </div>
              ))}
            </div>
          )}

          <p className="text-sm font-light whitespace-pre">{post.body}</p>
        </div>
        {isWithActionButtons ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between mt-3"
          >
            <CommentButton post={post} />
            <ReRoarrButton />
            <LikeButton post={post} />
            <ShareButton />
            <AnalyticButton />
          </div>
        ) : (
          <div>
            <div className="my-6">
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
