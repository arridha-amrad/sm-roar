import CommentIcon from "@src/icons/CommentIcon";
import { TPost } from "@src/modules/post/post.types";
import { FC, useRef, useState } from "react";
import CreateCommentForm from "./CreateCommentForm";
import Modal from "./Modal";
import Post from "./Post";

interface IProps {
  post: TPost;
}

const CommentButton: FC<IProps> = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const totalComment =
    post.children.length !== 0 ? post.children.length.toString() : "";

  const composerRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="relative group "
      >
        <div className="flex items-center hover:text-green-500">
          <CommentIcon />
          <span className="pb-1 text-sm">{totalComment}</span>
        </div>
        <div className="absolute hidden p-1 text-xs font-light -translate-x-1/2 rounded-lg group-hover:block dark:bg-black left-1/2 bg-slate-300 t">
          comment
        </div>
      </button>
      {isOpen && (
        <Modal setClose={closeModal}>
          <div className="relative -mx-4">
            <Post post={post} isWithActionButtons={false} />
          </div>
          <div ref={composerRef}>
            <CreateCommentForm closeModal={closeModal} postId={post.id} />
          </div>
        </Modal>
      )}
    </>
  );
};

export default CommentButton;
