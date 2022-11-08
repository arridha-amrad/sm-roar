import CloseIcon from "@src/icons/CloseIcon";
import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

interface IProps {
  setClose: VoidFunction;
  children: ReactNode;
}

const Modal: FC<IProps> = ({ setClose, children }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center backdrop-blur-md">
      <div className="absolute inset-0 bg-white opacity-20 dark:bg-slate-700" />
      <div className="bg-black h-fit max-h-[600px] sm:w-[500px] w-full mx-4 rounded-2xl p-4 mt-10 relative">
        <button onClick={setClose}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default Modal;
