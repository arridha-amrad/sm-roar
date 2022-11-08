import CommentIcon from "@src/icons/CommentIcon";
import { PostData } from "@src/modules/post/post.types";
import { FC, useState } from "react";
import CreateCommentForm from "./CreateCommentForm";
import Modal from "./Modal";
import Post from "./Post";

interface IProps {
  post: PostData;
}

const CommentButton: FC<IProps> = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    console.log("close modal");
    setIsOpen(false);
  };
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="relative group">
        <CommentIcon />
        <div className="absolute hidden p-1 text-xs font-light -translate-x-1/2 rounded-lg group-hover:block dark:bg-black left-1/2 bg-slate-300 t">
          comment
        </div>
      </button>
      {isOpen && (
        <Modal setClose={closeModal}>
          <Post post={post} isWithActionButtons={false} />
          <CreateCommentForm />
        </Modal>
      )}
    </>
  );
};

export default CommentButton;
