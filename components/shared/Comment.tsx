import timeSetter from '@src/utils/timeSetter';
import { FC } from 'react';
import Avatar from './Avatar';
import RoarrOptionsButton from './RoarrOptionsButton';

interface IProps {
  comment: {
    author: {
      id: number;
      username: string;
      name: string;
      imageURL: string;
    };
    body: string;
    createdAt: Date;
  };
}

const Comment: FC<IProps> = ({ comment }) => {
  const time = timeSetter(comment.createdAt.toString());
  return (
    <div className="flex items-start gap-4 p-4 cursor-pointer dark:hover:bg-slate-900">
      <Avatar url={comment.author.imageURL} />
      <div className="flex-1">
        <div>
          <h1 className="text-sm font-bold">
            {comment.author.name}
            <span className="mx-2 font-light dark:text-slate-400">
              @{comment.author.username} <span className="">· {time}</span>
            </span>
          </h1>
          <p className="font-light whitespace-pre">{comment.body}</p>
        </div>
      </div>
      <RoarrOptionsButton />
    </div>
  );
};

export default Comment;
