import BookMarkIcon from "@src/icons/BookmarkIcon";
import Hashtag from "@src/icons/HashtagIcon";
import HomeIcon from "@src/icons/HomeIcon";
import ListIcon from "@src/icons/ListIcon";
import MessageIcon from "@src/icons/MessageIcon";
import MoreIcon from "@src/icons/MoreIcon";
import NotificationIcon from "@src/icons/NotificationIcon";
import PencilIcon from "@src/icons/PencilIcon";
import ProfileIcon from "@src/icons/ProfileIcon";

import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import CreatePostForm from "../shared/CreatePostForm";
import Modal from "../shared/Modal";
import SidebarUser from "./SidebarUser";

const sidebarMenu = [
  {
    name: "Home",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Explore",
    link: "/explore",
    icon: <Hashtag />,
  },
  {
    name: "Notifications",
    link: "/notifications",
    icon: <NotificationIcon />,
  },
  {
    name: "Messages",
    link: "/messages",
    icon: <MessageIcon />,
  },
  {
    name: "Bookmark",
    link: "/bookmark",
    icon: <BookMarkIcon />,
  },
  {
    name: "Lists",
    link: "/lists",
    icon: <ListIcon />,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: <ProfileIcon />,
  },
  {
    name: "More",
    link: "/more",
    icon: <MoreIcon />,
  },
];

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  return (
    <div className="flex sticky top-0 bottom-0 left-0 flex-col py-3 lg:pl-4 lg:w-[300px] w-[100px] h-screen gap-2 items-center overflow-y-auto lg:items-start border-r border-slate-700">
      <Image
        onClick={() => router.push("/")}
        src="/logo.png"
        width={64}
        height={64}
        className="mb-2"
        alt="logo"
      />

      <div className="space-y-3">
        {sidebarMenu.map((menu, index) => (
          <div
            key={index}
            onClick={() => router.push(menu.link)}
            className={`flex relative items-center justify-center h-[50px] gap-4 ${
              router.pathname !== menu.link
                ? `dark:hover:bg-slate-900 hover:bg-gray-200`
                : ``
            }  cursor-pointer lg:px-4 lg:w-fit w-[50px] lg:rounded-xl lg:-ml-2 rounded-full ${
              router.pathname === menu.link
                ? "dark:text-white dark:bg-yellow-600 opacity-90 font-bold text-slate-800 bg-yellow-500"
                : ""
            }`}
          >
            {menu.icon}
            <h1 className="hidden text-xl font-medium lg:block">{menu.name}</h1>
          </div>
        ))}
      </div>

      <div className="flex-1 lg:w-full">
        <button
          onClick={() => setIsOpen(true)}
          className="max-w-[200px] w-full mr-8 my-btn lg:block hidden "
        >
          Roarr
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="block p-4 mt-2 bg-yellow-500 rounded-full dark:bg-yellow-600 lg:hidden"
        >
          <PencilIcon />
        </button>
      </div>
      <SidebarUser />
      {isOpen && (
        <Modal setClose={closeModal}>
          <CreatePostForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default Sidebar;
