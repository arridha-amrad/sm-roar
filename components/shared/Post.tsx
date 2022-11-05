import { Post } from '@prisma/client';
import { FC } from 'react';
import AnaliticButton from './AnaliticButton';
import CommentButton from './CommentButton';
import LikeButton from './LikeButton';
import ReRoarrButton from './ReRoarrButton';
import RoarrOptionsButton from './RoarrOptionsButton';
import ShareButton from './SharedButton';

interface IProps {
  post: Post;
}

const Post: FC<IProps> = ({ post }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-yellow-600 rounded-full"></div>
      <div className="flex-1">
        <div>
          <h1 className="text-sm font-bold">
            Arridha Amrad{' '}
            <span className="mx-2 font-light dark:text-slate-400">
              @arridhaamrad <span className="">· 2h</span>
            </span>
          </h1>
          <p className="font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, magnam.</p>
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
