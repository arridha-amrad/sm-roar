import AnalyticIcon from "@src/icons/AnalyticIcon";

const AnalyticButton = () => {
  return (
    <button className="relative group">
      <AnalyticIcon />
      <div className="absolute hidden p-1 text-xs font-light -translate-x-1/2 rounded-lg group-hover:block dark:bg-black left-1/2 bg-slate-300 t">
        analytics
      </div>
    </button>
  );
};

export default AnalyticButton;
