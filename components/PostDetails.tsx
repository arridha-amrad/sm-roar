import ElipsisHorizontalIcon from '@src/icons/ElipsisHorizontalIcon';
import { TPost } from '@src/modules/post/post.types';
import timeSetter from '@src/utils/timeSetter';
import { FC } from 'react';
import Avatar from './shared/Avatar';
import CommentButton from './shared/CommentButton';
import CreateCommentForm from './shared/CreateCommentForm';
import LikeButton from './shared/LikeButton';
import Post from './shared/Post';
import Reply from './shared/Reply';
import ReRoarrButton from './shared/ReRoarrButton';
import ShareButton from './shared/SharedButton';

interface IProps {
  post: TPost;
}

const PostDetails: FC<IProps> = ({ post }) => {
  const time = Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(post.createdAt));

  const date = Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
    new Date(post.createdAt)
  );

  return (
    <>
      <div className="flex flex-col gap-4 px-4">
        <div className="flex gap-4">
          <Avatar url={post.author.imageURL} />
          <div className="flex flex-col flex-1">
            <p className="font-bold">{post.author.name}</p>
            <p className="dark:text-slate-400 text-sm">
              @{post.author.username}
            </p>
          </div>
          <button>
            <ElipsisHorizontalIcon />
          </button>
        </div>
        <p className="text-xl grayscale">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptas
          voluptatibus dolores quibusdam necessitatibus, ex laborum! Sequi,
          quasi iste. Mollitia nemo officiis aut soluta recusandae assumenda
          modi sequi, totam cupiditate! Soluta quae non ratione accusamus
          temporibus, molestias aspernatur repellendus esse, ad, libero qui
          molestiae saepe odit amet sed dolore optio!
        </p>
        <div className="flex gap-1 text-slate-400">
          <p>{time} ·</p>
          <p>{date} ·</p>
          <p>Twitter for Web</p>
        </div>

        <div className="flex gap-4 items-center text-slate-400 py-4 border-t-2 border-b-2 border-slate-700">
          <p>
            <span className="text-white font-semibold">100</span> Reroarr
          </p>
          <p>
            {' '}
            <span className="text-white font-semibold">47</span> Quote Roarrs
          </p>
          <p>
            <span className="text-white font-semibold">1945</span> Likes
          </p>
        </div>

        <div className="flex justify-around">
          <CommentButton post={post} />
          <ReRoarrButton />
          <LikeButton post={post} />
          <ShareButton />
        </div>

        <hr className="border border-slate-700" />

        <div>
          <p className="mx-[68px] mb-2 text-sm">
            Replying to{' '}
            <span className="dark:text-yellow-500">
              @{post.author.username}
            </span>
          </p>
          <CreateCommentForm postId={post.id} />
        </div>
      </div>
      <hr className="border-2 border-slate-700 mt-4" />
      {post.children.map((reply, index) => (
        <div key={reply.id}>
          <Reply isWithActionButtons={true} reply={reply} />
          {index + 1 < post.children.length && <div className="w-full h-[1px] bg-slate-700" />}
        </div>
      ))}
    </>
  );
};

export default PostDetails;
