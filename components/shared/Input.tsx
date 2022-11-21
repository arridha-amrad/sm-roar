import Link from 'next/link';
import { forwardRef, InputHTMLAttributes, LegacyRef } from 'react';

type IProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  otherlink?: string;
  otherlabel?: string;
};

const Input = forwardRef((props: IProps, ref: LegacyRef<HTMLInputElement>) => {
  const { label, otherlink, otherlabel, error } = props;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="font-semibold">{label}</label>
        {otherlabel && otherlink && (
          <Link href={otherlink} className="text-sm text-blue-500 dark:text-blue-300">
            {otherlabel}
          </Link>
        )}
      </div>
      <input {...props} ref={ref} className="my-input" />
      {error && <small className="text-red-400">{error}</small>}
    </div>
  );
});

export default Input;
