import useLikePost from '@src/hooks/post/useLikePost';
import LoveIcon from '@src/icons/LoveIcon';
import { THomePost } from '@src/modules/post/post.types';
import { FC } from 'react';

interface IProps {
  post: THomePost;
}

const LikeButton: FC<IProps> = ({ post }) => {
  const { mutate } = useLikePost();

  const isLiked = post.isLiked;

  const handleLikePost = () => {
    mutate(post.id);
  };
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleLikePost();
      }}
      className="relative group "
    >
      <div
        className={`flex relative hover:text-pink-500 item-center ${
          isLiked ? 'text-pink-500' : ''
        }`}
      >
        <LoveIcon isSmall={true} />
        <span className="absolute text-sm top-0 left-6">
          {post._count.likes > 0 ? post._count.likes : ''}
        </span>
      </div>
      <div className="absolute hidden p-1 text-xs font-light -translate-x-1/2 rounded-lg group-hover:block dark:bg-black left-1/2 bg-slate-300 t">
        like
      </div>
    </button>
  );
};

export default LikeButton;
