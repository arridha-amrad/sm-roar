import Image from 'next/image';
import { FC } from 'react';

const Avatar: FC<{ url?: string }> = ({ url = '' }) => {
  return (
    <Image
      alt="avatar"
      width={48}
      height={48}
      className="object-cover rounded-full self-start"
      src={url === 'default' || '' ? '/default.png' : url}
    />
  );
};

export default Avatar;
