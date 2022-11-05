import ElipsisHorizontalIcon from '@src/icons/ElipsisHorizontalIcon';

const RoarrOptionsButton = () => {
  return (
    <button className="relative group">
      <ElipsisHorizontalIcon />
      <div className="absolute hidden p-1 text-xs font-light -translate-x-1/2 rounded-lg group-hover:block dark:bg-black left-1/2 bg-slate-300 t">
        more
      </div>
    </button>
  );
};

export default RoarrOptionsButton;
