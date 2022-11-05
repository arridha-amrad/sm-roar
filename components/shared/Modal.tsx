import CloseIcon from '@src/icons/CloseIcon';
import { FC } from 'react';
import CreatePostForm from './CreatePostForm';

interface IProps {
  setClose: VoidFunction;
}

const Modal: FC<IProps> = ({ setClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center backdrop-blur-sm">
      <div className="absolute inset-0 bg-white opacity-20 dark:bg-slate-700" />
      <div className="bg-black h-fit max-h-[600px] sm:w-[500px] w-full mx-4 rounded-2xl p-4 mt-10 relative">
        <button onClick={setClose}>
          <CloseIcon />
        </button>
        <CreatePostForm />
      </div>
    </div>
  );
};

export default Modal;
