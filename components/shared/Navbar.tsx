import { FC } from 'react';

interface IProps {
  icon?: JSX.Element;
  label: string;
}

const Navbar: FC<IProps> = ({ icon, label }) => {
  return (
    <div
      className={`sticky inset-0 z-10 flex items-center h-16 pl-4 space-x-4 bg-slate-800 opacity-90`}
    >
      {icon}
      <h1 className="relative text-xl font-semibold">{label}</h1>
    </div>
  );
};

export default Navbar;
