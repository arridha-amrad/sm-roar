import { useRouter } from 'next/router';
import { FC } from 'react';

interface IProps {
  icon?: JSX.Element;
  label: string;
}

const Navbar: FC<IProps> = ({ icon, label }) => {
  const router = useRouter();
  return (
    <div className={`sticky inset-0 z-10 flex items-center h-16 pl-4 space-x-4 `}>
      <div className="absolute inset-0 bg-slate-800 opacity-90" />
      {icon && <button onClick={() => router.back()}>{icon}</button>}
      <h1 className="relative text-xl font-semibold">{label}</h1>
    </div>
  );
};

export default Navbar;
