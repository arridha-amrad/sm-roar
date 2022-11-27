import { TReplies } from "@src/modules/post/post.types";
import { FC } from "react";
import Comment from "./Comment";

interface IProps {
  replies: TReplies[];
}

const Replies: FC<IProps> = ({ replies }) => {
  return (
    <>
      {replies.map((reply) => (
        <Comment comment={reply} key={reply.id} />
      ))}
    </>
  );
};

export default Replies;
