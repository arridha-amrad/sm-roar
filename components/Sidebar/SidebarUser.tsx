import useLogout from "@src/hooks/user/useLogout";
import useMe, { Me } from "@src/hooks/user/useMe";
import ElipsisHorizontalIcon from "@src/icons/ElipsisHorizontalIcon";
import queryClient from "@src/utils/queryClient";
import { useEffect, useRef, useState } from "react";
import Avatar from "../Avatar";

const SidebarUser = () => {
  useMe();
  const user = queryClient.getQueryData<Me>(["me"]);
  // const { data: user, isLoading } = useMe();
  const [isShow, setIsShow] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate();
  };

  const hidePopup = (e: KeyboardEvent) => {
    if (isShow) {
      if (e.key === "Escape") {
        setIsShow(false);
      }
    }
  };

  const clickOutside = (e: MouseEvent) => {
    if (isShow) {
      if (!popupRef.current?.contains(e.target as Node)) {
        setIsShow(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", hidePopup);
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("keydown", hidePopup);
      document.removeEventListener("click", clickOutside);
    };
  }, [isShow]);

  return (
    <div className="relative w-full select-none">
      <div
        ref={popupRef}
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
        <div className="fixed z-10 w-[300px] h-[100px] overflow-hidden border  rounded-xl bottom-20 bg-slate-800 dark:border-slate-700 flex flex-col ">
          <button
            onClick={() => alert("method not implemented")}
            className="flex-1 w-full px-6 text-sm text-start hover:bg-slate-900"
          >
            Add an exsiting account
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 w-full px-6 text-sm text-start hover:bg-slate-900"
          >
            Log out @{user?.username}
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarUser;
