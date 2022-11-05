import { Post } from '@prisma/client';
import useLikePost from '@src/hooks/post/useLikePost';
import LoveIcon from '@src/icons/LoveIcon';
import { FC } from 'react';

interface IProps {
  post: Post;
}

const LikeButton: FC<IProps> = ({ post }) => {
  const { mutate } = useLikePost();
  const handleLikePost = () => {
    mutate(post.id);
  };
  return (
    <button onClick={handleLikePost} className="relative group ">
      <div className="hover:text-pink-500 ">
        <LoveIcon isSmall={true} />
      </div>
      <div className="absolute hidden p-1 text-xs font-light -translate-x-1/2 rounded-lg group-hover:block dark:bg-black left-1/2 bg-slate-300 t">
        like
      </div>
    </button>
  );
};

export default LikeButton;
