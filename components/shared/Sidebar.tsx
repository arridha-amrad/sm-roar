import BookMarkIcon from '@src/icons/BookmarkIcon';
import ElipsisHorizontalIcon from '@src/icons/ElipsisHorizontalIcon';
import Hashtag from '@src/icons/HashtagIcon';
import HomeIcon from '@src/icons/HomeIcon';
import ListIcon from '@src/icons/ListIcon';
import MessageIcon from '@src/icons/MessageIcon';
import MoreIcon from '@src/icons/MoreIcon';
import NotificationIcon from '@src/icons/NotificationIcon';
import PencilIcon from '@src/icons/PencilIcon';
import ProfileIcon from '@src/icons/ProfileIcon';
import Logo from '@src/images/logo.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Modal from './Modal';

const sidebarMenu = [
  {
    name: 'Home',
    link: '/',
    icon: <HomeIcon />,
  },
  {
    name: 'Explore',
    link: '/explore',
    icon: <Hashtag />,
  },
  {
    name: 'Notifications',
    link: '/notifications',
    icon: <NotificationIcon />,
  },
  {
    name: 'Messages',
    link: '/messages',
    icon: <MessageIcon />,
  },
  {
    name: 'Bookmark',
    link: '/bookmark',
    icon: <BookMarkIcon />,
  },
  {
    name: 'Lists',
    link: '/lists',
    icon: <ListIcon />,
  },
  {
    name: 'Profile',
    link: '/profile',
    icon: <ProfileIcon />,
  },
  {
    name: 'More',
    link: '/more',
    icon: <MoreIcon />,
  },
];

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col py-3 lg:pl-4 lg:basis-[300px] basis-[100px] min-h-screen gap-2 items-center lg:items-start">
      <div className="w-12 h-12 mb-2">
        <Image priority src={Logo} alt="logo" />
      </div>

      <div className="space-y-2">
        {sidebarMenu.map((menu, index) => (
          <div
            key={index}
            onClick={() => router.push(menu.link)}
            className={`flex relative items-center justify-center h-[50px] gap-4 dark:hover:bg-slate-900 cursor-pointer hover:bg-gray-200 lg:px-4 lg:w-fit w-[50px] lg:rounded-xl lg:-ml-2 rounded-full ${
              router.pathname === menu.link
                ? 'dark:text-white dark:bg-yellow-600 opacity-90 font-bold text-slate-800 bg-yellow-500'
                : ''
            }`}
          >
            {menu.icon}
            <h1 className="hidden text-xl font-medium lg:block">{menu.name}</h1>
          </div>
        ))}
      </div>

      <div className="flex-1 lg:w-full">
        <button onClick={() => setIsOpen(true)} className="max-w-[200px] w-full mr-8 my-btn lg:block hidden ">
          Roarr
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="block p-4 mt-2 bg-yellow-500 rounded-full dark:bg-yellow-600 lg:hidden"
        >
          <PencilIcon />
        </button>
      </div>

      {isOpen && <Modal setClose={() => setIsOpen(false)} />}

      <div className="flex justify-center w-full gap-3 py-2 cursor-pointer lg:px-4 rounded-xl dark:hover:bg-slate-900 lg:-ml-3 lg:justify-start">
        <div className="w-12 h-12 bg-pink-500 rounded-full"></div>
        <div className="flex-1 hidden lg:block">
          <h1 className="text-sm font-semibold">LizandroMartinez6</h1>
          <p className="text-sm font-normal tracking-wide">@Lichaaa6</p>
        </div>
        <button className="hidden lg:block">
          <ElipsisHorizontalIcon />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
