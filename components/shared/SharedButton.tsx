import ShareIcon from '@src/icons/ShareIcon';

const ShareButton = () => {
  return (
    <button className="relative group">
      <ShareIcon />
      <div className="absolute hidden p-1 text-xs font-light -translate-x-1/2 rounded-lg group-hover:block dark:bg-black left-1/2 bg-slate-300 t">
        share
      </div>
    </button>
  );
};

export default ShareButton;
