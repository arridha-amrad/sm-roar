import ArrowPathIcon from '@src/icons/ArrowpathIcon';

const ReRoarrButton = () => {
  return (
    <button className="relative group">
      <ArrowPathIcon />
      <div className="absolute hidden p-1 text-xs font-light -translate-x-1/2 rounded-lg group-hover:block dark:bg-black left-1/2 bg-slate-300 t">
        reroarr
      </div>
    </button>
  );
};

export default ReRoarrButton;
