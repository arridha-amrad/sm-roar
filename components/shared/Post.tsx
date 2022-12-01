import { THomePost } from '@src/modules/post/post.types';
import timeSetter from '@src/utils/timeSetter';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import Avatar from './Avatar';
import AnalyticButton from './AnalyticButton';
import CommentButton from './CommentButton';
import LikeButton from './LikeButton';
import ReRoarrButton from './ReRoarrButton';
import RoarrOptionsButton from './RoarrOptionsButton';
import ShareButton from './SharedButton';

interface IProps {
  post: THomePost;
  isWithActionButtons: boolean;
}

const Post: FC<IProps> = ({ post, isWithActionButtons }) => {
  const time = timeSetter(post.createdAt.toString());

  const router = useRouter();

  const navigate = () => {
    router.push(`/${post.author.username}/status/${post.id}`);
  };

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
          <p className="text-sm text-slate-400">
            Replying to{' '}
            {post.parents.map((parent, index) => (
              <span key={parent.author.id} className="text-yellow-600">
                @{parent.author.username}
                {post.parents.length > 1 &&
                index === post.parents.length - 2 ? (
                  <span className="px-1">&</span>
                ) : (
                  <span className="px-1"></span>
                )}
              </span>
            ))}
          </p>
          <p className="font-light text-sm whitespace-pre">{post.body}</p>
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
                Replying to{' '}
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
