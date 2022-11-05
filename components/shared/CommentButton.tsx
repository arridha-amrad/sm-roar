import CommentIcon from '@src/icons/CommentIcon';

const CommentButton = () => {
  return (
    <button className="relative group">
      <CommentIcon />
      <div className="absolute hidden p-1 text-xs font-light -translate-x-1/2 rounded-lg group-hover:block dark:bg-black left-1/2 bg-slate-300 t">
        comment
      </div>
    </button>
  );
};

export default CommentButton;
