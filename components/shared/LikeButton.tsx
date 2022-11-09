import { Post } from '@prisma/client';
import useLikePost from '@src/hooks/post/useLikePost';
import { Me } from '@src/hooks/user/useMe';
import LoveIcon from '@src/icons/LoveIcon';
import { PostData } from '@src/modules/post/post.types';
import queryClient from '@src/utils/queryClient';
import { FC } from 'react';

interface IProps {
  post: PostData;
}

const LikeButton: FC<IProps> = ({ post }) => {
  const { mutate } = useLikePost();
  const me = queryClient.getQueryData<Me>(['me']);

  const isLiked = me && post.Like.find((like) => like.userId === me.id);

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
      <div className={`flex hover:text-pink-500 item-center ${isLiked ? 'text-pink-500' : ''}`}>
        <LoveIcon isSmall={true} />
        <span className="text-sm">{post.Like.length > 0 ? post.Like.length : ''}</span>
      </div>
      <div className="absolute hidden p-1 text-xs font-light -translate-x-1/2 rounded-lg group-hover:block dark:bg-black left-1/2 bg-slate-300 t">
        like
      </div>
    </button>
  );
};

export default LikeButton;
