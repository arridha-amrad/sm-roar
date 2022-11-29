import useLikePost from "@src/hooks/post/useLikePost";
import { Me } from "@src/hooks/user/useMe";
import LoveIcon from "@src/icons/LoveIcon";
import { IPost, TPost } from "@src/modules/post/post.types";
import queryClient from "@src/utils/queryClient";
import { FC } from "react";

interface IProps {
  post: IPost;
}

const LikeButton: FC<IProps> = ({ post }) => {
  const { mutate } = useLikePost();
  const me = queryClient.getQueryData<Me>(["me"]);

  const isLiked = true

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
          isLiked ? "text-pink-500" : ""
        }`}
      >
        <LoveIcon isSmall={true} />
        <span className="absolute text-sm top-0 left-6">
          {post._count.likes > 0 ? post._count.likes : ""}
        </span>
      </div>
      <div className="absolute hidden p-1 text-xs font-light -translate-x-1/2 rounded-lg group-hover:block dark:bg-black left-1/2 bg-slate-300 t">
        like
      </div>
    </button>
  );
};

export default LikeButton;
