import AnaliticIcon from '@src/icons/AnaliticIcon';

const AnaliticButton = () => {
  return (
    <button className="relative group">
      <AnaliticIcon />
      <div className="absolute hidden p-1 text-xs font-light -translate-x-1/2 rounded-lg group-hover:block dark:bg-black left-1/2 bg-slate-300 t">
        analitics
      </div>
    </button>
  );
};

export default AnaliticButton;
