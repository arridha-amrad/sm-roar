import Head from "next/head";
import Image from "next/image";
import ThemeSwitcher from "@src/components/shared/ThemeSwitcher";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import Input from "@src/components/shared/Input";
import useLogin from "@src/hooks/user/useLogin";
import Checkbox from "@src/components/shared/Checkbox";

const Login = () => {
  const identityRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const { mutate, error, isError, isLoading } = useLogin();
  const [isShowPassword, setIsShowPassword] = useState(false);

  useEffect(() => {
    identityRef.current?.focus();
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const identity = identityRef.current?.value;
    const password = passwordRef.current?.value;
    if (identity && password) {
      mutate({
        identity,
        password,
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-10 select-none min-w-screen">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      <Head>
        <title>Roarr - Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="relative w-16 h-16 mx-auto">
        <Image src="/logo.png" fill alt="logo" sizes="(max-width: 100%)" />
      </div>

      <h1 className="mb-10 text-3xl font-semibold text-center ">
        Login to <span className="font-bold text-yellow-500">Roarr</span>
      </h1>

      <form
        onSubmit={onSubmit}
        className="flex relative flex-col gap-4 w-[300px]"
      >
        {isError && (
          <div className="max-w-[300px] w-[300px] absolute -top-7 text-center dark:text-red-400 text-red-500 ">
            {error}
          </div>
        )}

        <Input ref={identityRef} type="text" label="Username or email" />
        <Input
          ref={passwordRef}
          label="Password"
          type={isShowPassword ? "text" : "password"}
          otherlabel="forgot password"
          otherlink="/forgotPassword"
        />

        <div className="flex items-center gap-3">
          <Checkbox toggleFunction={() => setIsShowPassword((val) => !val)} />
          <label>Show Password</label>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="self-stretch my-btn"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-sm">
        don't have an account ?{" "}
        <Link className="text-blue-500 dark:text-blue-300" href={"/register"}>
          register
        </Link>
      </div>
    </div>
  );
};

export default Login;
