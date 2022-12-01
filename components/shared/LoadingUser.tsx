import Image from "next/image";

const LoadingUser = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen ">
      <Image priority src="/logo.png" alt="logo" width={96} height={96} />
    </div>
  );
};

export default LoadingUser;
