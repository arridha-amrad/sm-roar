import useLogout from '@src/hooks/user/useLogout';
import { Me } from '@src/hooks/user/useMe';
import ElipsisHorizontalIcon from '@src/icons/ElipsisHorizontalIcon';
import queryClient from '@src/utils/queryClient';
import { useState } from 'react';
import Avatar from '../Avatar';

const SidebarUser = () => {
  const user = queryClient.getQueryData<Me>(['me']);
  const [isShow, setIsShow] = useState(false);
  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate();
  };
  return (
    <div className="relative w-full select-none">
      <div
        onClick={() => setIsShow((val) => !val)}
        className="flex justify-center w-full gap-3 py-2 cursor-pointer lg:px-4 rounded-xl dark:hover:bg-slate-900 lg:-ml-3 lg:justify-start"
      >
        <Avatar url={user?.imageURL} />
        <div className="flex-1 hidden lg:block">
          <h1 className="text-base font-semibold">{user?.name}</h1>
          <p className="text-sm font-normal tracking-wide">@{user?.username}</p>
        </div>
        <button className="hidden lg:block">
          <ElipsisHorizontalIcon />
        </button>
      </div>
      {isShow && (
        <div className="absolute z-10 w-full h-[100px] overflow-hidden border right-8 -left-2 rounded-xl -top-28 bg-slate-800 dark:border-slate-700 flex flex-col ">
          <button
            onClick={() => alert('method not implemented')}
            className="flex-1 w-full px-6 text-sm text-start hover:bg-slate-900"
          >
            Add an exsiting account
          </button>
          <button onClick={handleLogout} className="flex-1 w-full px-6 text-sm text-start hover:bg-slate-900">
            Log out @{user?.username}
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarUser;
