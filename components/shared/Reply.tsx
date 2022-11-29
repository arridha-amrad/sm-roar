import { TPost, TReplies, TReply } from '@src/modules/post/post.types';
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
  reply: TReply;
  isWithActionButtons: boolean;
}

const Reply: FC<IProps> = ({ reply, isWithActionButtons }) => {
  const time = timeSetter(reply.createdAt.toString());

  const router = useRouter();

  const navigate = () => {
    console.log('move');

    router.push(`/${reply.author.username}/status/${reply.id}`);
  };

  return (
    <div
      onClick={navigate}
      className="flex items-start gap-4 p-4 cursor-pointer"
    >
      <Avatar url={reply.author.imageURL} />
      <div className="flex-1">
        <div>
          <h1 className="text-sm font-bold">
            {reply.author.name}
            <span className="mx-2 font-light dark:text-slate-400">
              @{reply.author.username} <span className="">· {time}</span>
            </span>
          </h1>
          <p className="font-light whitespace-pre">{reply.body}</p>
        </div>
        {isWithActionButtons ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between mt-3"
          >
            {/* <CommentButton reply={reply} /> */}
            <ReRoarrButton />
            {/* <LikeButton reply={reply} /> */}
            <ShareButton />
            <AnalyticButton />
          </div>
        ) : (
          <div>
            <div className="my-6">
              <p className="text-sm dark:text-slate-600 text-slate-200">
                Replying to{' '}
                <Link href="/profile" className="text-blue-500 ">
                  @{reply.author.username}
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
      <RoarrOptionsButton />
    </div>
  );
};

export default Reply;
