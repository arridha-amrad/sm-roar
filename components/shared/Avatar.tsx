import { FC } from 'react';

const Avatar: FC<{ url?: string }> = ({ url = '' }) => {
  return (
    <div className="w-12 h-12 overflow-hidden rounded-full">
      <img className="object-cover " src={url === 'default' || '' ? '/default.png' : url} />
    </div>
  );
};

export default Avatar;
