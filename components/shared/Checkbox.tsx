import CheckIcon from "@src/icons/CheckIcon";
import { FC, useRef } from "react";

interface IProps {
  toggleFunction: VoidFunction;
}

const Checkbox: FC<IProps> = ({ toggleFunction }) => {
  const checkRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="relative pt-1 cursor-pointer">
      <input
        ref={checkRef}
        onChange={toggleFunction}
        type="checkbox"
        className="my-checkbox peer"
      />
      <div
        onClick={() => checkRef.current?.click()}
        className="absolute left-0 self-start hidden w-5 h-5 bg-yellow-500 rounded-md top-1 peer-checked:block"
      />
      <div
        onClick={() => checkRef.current?.click()}
        className="absolute left-[1px] top-[5px] hidden peer-checked:block"
      >
        <CheckIcon />
      </div>
    </div>
  );
};

export default Checkbox;
